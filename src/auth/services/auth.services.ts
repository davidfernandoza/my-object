import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Auth } from '@database/entities/auth/auth.entity';
import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { TemplateService } from '@common/services/template.service';
import { HelperService } from '@common/services/helper.service';
import { MailService } from '@common/services/mail.service';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { JwtServices } from '@auth/services/jwt.services';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { VerificationEmailServices } from '@auth/services/verification-email.services';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class AuthServices implements IAuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly templateService: TemplateService,
		private readonly helperService: HelperService,
		private readonly mailService: MailService,
		private readonly jwtServices: JwtServices,
		private readonly authTokenRepository: AuthTokenRepository,
		private readonly verificationEmailServices: VerificationEmailServices,
	) {}

	async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
		try {
			const code = this.helperService.generateCode(6);
			const view = this.templateService.compile('verify.email', { code });
			const verificationEmailToken = await this.verificationEmailServices.generateToken(code);
			const newAuth = this.authRepository.create({ ...payload, verificationEmailToken });
			let auth = await this.authRepository.save(newAuth);
			this.mailService.sendEmail({
				to: [payload.email],
				subject: 'Creación de cuenta en My Object',
				message: view,
				type: 'html',
				engine: 'nodemailer',
			});
			const tokens = this.login(auth, false);
			auth = plainToInstance(Auth, auth); // se pasa por este paso para no enviar las execiones
			return { auth, tokens };
		} catch (error) {
			console.error(error, '****************');
			throw new InternalServerErrorException(error.message);
		}
	}

	public async validateAuth(email: string, password: string): Promise<Auth> {
		const auth = await this.authRepository.findOneBy({ email });
		if (auth && (await auth.comparePassword(password))) {
			return auth;
		}
		throw new UnauthorizedException('Credentials invalid');
	}

	public async login(auth: Auth, remember: boolean): Promise<LoginResponseDTO> {
		const payload = { id: auth.id };
		const accessToken = this.jwtServices.generateAccessToken(payload);
		let refreshToken = null;
		if (remember) {
			refreshToken = this.jwtServices.generateRefreshToken(payload);
			await this.authTokenRepository.addToken(auth, refreshToken, TokenType.JWTRefresh);
		}
		return { ...accessToken, ...refreshToken };
	}

	async refreshToken(refreshToken: string): Promise<LoginResponseDTO> {
		try {
			const payload = this.jwtServices.validateRefreshToken(refreshToken);
			const auth = await this.authRepository.findOne({
				relations: { authTokens: true },
				where: {
					id: payload.authId,
					authTokens: { token: refreshToken, type: TokenType.JWTRefresh },
				},
			});
			if (!auth || auth.authTokens[0].token !== refreshToken) {
				throw new UnauthorizedException('Token unavaliable');
			}
			return this.login(auth, true);
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}

	async logout(id: number, token: string): Promise<void> {
		const auth = await this.authRepository.getOneById(id);
		if (!auth) throw new UnauthorizedException();
		await this.authTokenRepository.addToken(auth, token, TokenType.JWTBlackAccess);
		// await this.authRepository.update({ id }, { refreshToken: null });
	}
}
