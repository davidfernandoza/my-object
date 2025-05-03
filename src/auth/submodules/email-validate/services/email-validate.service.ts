import { Auth } from '@database/entities/auth/auth.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import moment from 'moment';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { In } from 'typeorm';
// import { plainToInstance } from 'class-transformer';

import { TokenType } from '@database/enums/auth/auth-token.enum';
import { HelperService } from '@common/services/helper.service';
import { TemplateService } from '@common/services/template.service';
import { MailService } from '@common/services/mail.service';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { IEmailValidateServices } from '@auth/submodules/email-validate/interfaces/email-validate-services.interface';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { ResentCodeResponseDTO } from '@auth/submodules/email-validate/dtos/resent-code.dto';

@Injectable()
export class EmailValidateServices implements IEmailValidateServices {
	private readonly salt: number = 5;
	private readonly expirationMinutes: number = 30;

	constructor(
		private readonly helperService: HelperService,
		private readonly templateService: TemplateService,
		private readonly mailService: MailService,
		private readonly authTokenRepository: AuthTokenRepository,
		private readonly authRepository: AuthRepository,
	) {}

	async generateSalt(): Promise<string> {
		return await bcrypt.genSalt(this.salt);
	}

	async generateToken(code: string): Promise<string> {
		const salt = await this.generateSalt();
		return bcrypt.hash(code, salt);
	}

	async sendVerificationCodeToEmail(auth: Auth): Promise<{ apiKey: string; expiration: string }> {
		const code = this.helperService.generateCode(6);
		const templateView = this.templateService.compile('verify.email', { code });
		const verificationEmailToken = await this.generateToken(code);
		const expiration = moment().add(this.expirationMinutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
		const apiKey = crypto.randomBytes(32).toString('hex');
		await this.deleteEmailVerificationTokens(auth);
		await Promise.all([
			this.authTokenRepository.addToken(
				auth,
				verificationEmailToken,
				TokenType.VerificationEmailToken,
				expiration,
			),
			this.authTokenRepository.addToken(
				auth,
				apiKey,
				TokenType.VerificationEmailApiKey,
				expiration,
			),
		]);
		this.mailService.sendEmail({
			to: [auth.email],
			subject: 'Creación de cuenta en My Object',
			message: templateView,
			type: 'html',
			engine: 'nodemailer',
		});

		return { apiKey, expiration };
	}

	async validateAccount(apikey: string, code: string): Promise<Auth> {
		const authToken = await this.authTokenRepository.getAuthByApiKeyAndToken(
			apikey,
			TokenType.VerificationEmailApiKey,
			TokenType.VerificationEmailToken,
		);
		if (!authToken) {
			throw new UnauthorizedException('Invalid API key');
		}
		if (this.helperService.isExpired(String(authToken.expiration))) {
			throw new UnauthorizedException('API key expired');
		}

		const isValid = await bcrypt.compare(code, authToken.auth.authTokens[0].token);
		if (!isValid) {
			throw new UnauthorizedException('Invalid code');
		}
		const auth = authToken.auth;
		await this.authRepository.update(auth.id, {
			verificationEmailDate: moment().toDate(),
		});
		await this.deleteEmailVerificationTokens(auth);
		return auth;
	}

	async resentCode(
		apikey: string,
		remember: boolean | null = null,
	): Promise<ResentCodeResponseDTO> {
		const authToken = await this.authTokenRepository.getAuthByApiKeyAndToken(
			apikey,
			TokenType.VerificationEmailApiKey,
			TokenType.VerificationEmailToken,
		);
		if (!authToken) {
			throw new UnauthorizedException('Invalid API key');
		}
		const auth = authToken.auth;
		const newAuthToken = await this.sendVerificationCodeToEmail(auth);
		return {
			accessToken: null,
			refreshToken: null,
			apiKey: newAuthToken.apiKey,
			apiKeyExpiration: newAuthToken.expiration,
			withVerificationEmail: false,
			with2FA: false,
			remember,
		};
	}

	async deleteEmailVerificationTokens(auth: Auth): Promise<void> {
		await this.authTokenRepository.delete({
			auth: auth,
			type: In([TokenType.VerificationEmailToken, TokenType.VerificationEmailApiKey]),
		});
	}
}
