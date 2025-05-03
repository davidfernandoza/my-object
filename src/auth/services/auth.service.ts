import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { Auth } from '@database/entities/auth/auth.entity';
import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { JwtServices } from '@auth/services/jwt.service';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.service';
import { TokenType } from '@database/enums/auth/auth-token.enum';
import { AuthToken } from '@database/entities/auth/auth-token.entity';

@Injectable()
export class AuthServices implements IAuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtServices: JwtServices,
		private readonly authTokenRepository: AuthTokenRepository,
		private readonly emailValidateServices: EmailValidateServices,
	) {}

	async register(body: RegisterDTO): Promise<RegisterResponseDTO> {
		try {
			const auth = await this.authRepository.register(body.email, body.password);
			const { expiration, apiKey } =
				await this.emailValidateServices.sendVerificationCodeToEmail(auth);
			return {
				accessToken: null,
				refreshToken: null,
				apiKey,
				apiKeyExpiration: expiration,
				withVerificationEmail: false,
				with2FA: false,
				remember: false,
			};
		} catch (error) {
			console.error(error, '****************');
			throw new InternalServerErrorException(error.message);
		}
	}

	public async validateAuth(email: string, password: string): Promise<Auth> {
		const auth = await this.authRepository.findOneBy({ email, isActive: true });
		if (auth && (await auth.comparePassword(password))) {
			return auth;
		}
		throw new UnauthorizedException('Credentials invalid');
	}

	public async login(
		auth: Auth,
		remember: boolean,
		with2FA: boolean | null,
	): Promise<LoginResponseDTO> {
		const body = { id: auth.id };
		const accessToken = this.jwtServices.generateAccessToken(body);
		let refreshToken = null;
		if (remember) {
			refreshToken = this.jwtServices.generateRefreshToken(body);
			await this.authTokenRepository.addToken(
				auth,
				refreshToken.refreshToken,
				TokenType.JWTRefreshToken,
			);
		}
		return {
			...accessToken,
			...refreshToken,
			apiKey: null,
			apiKeyExpiration: null,
			withVerificationEmail: true,
			with2FA,
			remember,
		};
	}

	async refreshToken(refreshToken: string): Promise<LoginResponseDTO> {
		try {
			const body = this.jwtServices.validateRefreshToken(refreshToken);
			const auth = await this.authRepository.findOne({
				relations: { authTokens: true },
				where: {
					id: body.authId,
					authTokens: { token: refreshToken, type: TokenType.JWTRefreshToken },
				},
			});
			if (!auth || auth.authTokens[0].token !== refreshToken) {
				throw new UnauthorizedException('Token unavaliable');
			}
			return this.login(auth, true, null);
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}

	public async getAuthByApiKey(
		apiKey: string,
		tokenTypeApiKey: TokenType,
		tokenType?: TokenType,
	): Promise<AuthToken> {
		if (!tokenType) return await this.authTokenRepository.getAuthByApiKey(apiKey, tokenTypeApiKey);
		return await this.authTokenRepository.getAuthByApiKeyAndToken(
			apiKey,
			tokenTypeApiKey,
			tokenType,
		);
	}

	async logout(idAuth: number, token: string): Promise<void> {
		const auth = await this.authRepository.getOneById(idAuth);
		if (!auth) throw new UnauthorizedException();
		await this.authTokenRepository.addToken(auth, token, TokenType.JWTBlackAccessToken);
		await this.authTokenRepository.delete({
			auth: { id: idAuth },
			type: TokenType.JWTRefreshToken,
		});
	}
}
