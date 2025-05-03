import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
import * as crypto from 'crypto';

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ITwoFactorAuthService } from '@auth/submodules/2FA/interfaces/two-factor-auth-service.interface';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { ConfigService } from '@config/app.config';
import { Auth } from '@database/entities/auth/auth.entity';
import moment from 'moment';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { In } from 'typeorm';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class TwoFactorAuthService implements ITwoFactorAuthService {
	private ivLength: number;
	private encryptionSalt: string;
	private nameApp: string;
	private readonly algorithm: string = 'aes-256-cbc';
	private readonly expirationMinutes: number = 30;

	constructor(
		private readonly authRepository: AuthRepository,
		private readonly configService: ConfigService,
		private readonly authTokenRepository: AuthTokenRepository,
	) {
		this.ivLength = Number(this.configService.getConfig().twoFactorAuth.encryptionIvLength);
		this.encryptionSalt = this.configService.getConfig().twoFactorAuth.encryptionSalt;
		this.nameApp = this.configService.getConfig().app.name;
	}

	public async changeActivation(
		id: number,
		with2FA: boolean,
	): Promise<{ qrCode: string | null; status: boolean; secret: string | null }> {
		const auth = await this.authRepository.getOneById(id);

		if (!auth) throw new UnauthorizedException();
		if (!with2FA) {
			await this.authRepository.update(auth.id, { with2FA, secret2FA: null });
			return { qrCode: null, status: false, secret: null };
		}
		if (auth.with2FA && auth.secret2FA) {
			throw new BadRequestException('2FA already activated');
		}
		const { otpauthUrl, secretBase32 } = this.generateSecret(auth.email);
		const secret2FA = this.encrypt(secretBase32);
		const qrCode = await this.generateQRCode(otpauthUrl);
		await this.authRepository.update(auth.id, { secret2FA });
		return { qrCode, status: true, secret: secretBase32 };
	}

	public async activate2FA(idAuth: number): Promise<void> {
		const auth = await this.authRepository.getOneById(idAuth);
		if (!auth || !auth.secret2FA) throw new UnauthorizedException();
		if (auth.with2FA && auth.secret2FA) {
			throw new BadRequestException('2FA already activated');
		}
		await this.authRepository.update(auth.id, { with2FA: true });
	}

	public async validateCode(code: string, idAuth: number): Promise<any> {
		const auth = await this.authRepository.getOneById(idAuth);
		if (!auth || !auth.secret2FA) throw new UnauthorizedException();
		const secret = this.decrypt(auth.secret2FA);
		return speakeasy.totp.verify({
			secret,
			encoding: 'base32',
			token: code,
			window: 1,
		});
	}

	async createApiKey(auth: Auth): Promise<{ apiKey: string; expiration: string }> {
		const expiration = moment().add(this.expirationMinutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
		const apiKey = crypto.randomBytes(32).toString('hex');
		await this.deleteTwoFactorTokens(auth);
		await this.authTokenRepository.addToken(auth, apiKey, TokenType.TwoFAApiKey, expiration);
		return { apiKey, expiration };
	}

	private generateSecret(email: string): { otpauthUrl: string; secretBase32: string } {
		const secret = speakeasy.generateSecret({
			name: `${this.nameApp} (${email})`,
			issuer: this.nameApp,
		});
		return {
			otpauthUrl: secret.otpauth_url,
			secretBase32: secret.base32,
		};
	}

	private async generateQRCode(otpauthUrl: string): Promise<string> {
		return await qrcode.toDataURL(otpauthUrl);
	}
	private encrypt(secretBase32: string) {
		const iv = crypto.randomBytes(this.ivLength);
		const key = crypto.scryptSync(this.encryptionSalt, 'salt', 32);
		const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key), iv);
		let encrypted = cipher.update(secretBase32);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return iv.toString('hex') + ':' + encrypted.toString('hex');
	}

	private decrypt(secretEncrypted: string) {
		const secretBase32Parts = secretEncrypted.split(':');
		const iv = Buffer.from(secretBase32Parts.shift(), 'hex');
		const key = crypto.scryptSync(this.encryptionSalt, 'salt', 32);
		const encryptedSecretBase32 = Buffer.from(secretBase32Parts.join(':'), 'hex');
		const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(key), iv);
		let decrypted = decipher.update(encryptedSecretBase32);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}

	async deleteTwoFactorTokens(auth: Auth): Promise<void> {
		await this.authTokenRepository.delete({
			auth: auth,
			type: In([TokenType.TwoFAApiKey, TokenType.TwoFAToken]),
		});
	}
}
