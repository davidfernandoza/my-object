import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { Auth } from '@database/entities/auth/auth.entity';
import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { JwtServices } from '@auth/services/jwt.services';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.services';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class AuthServices implements IAuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtServices: JwtServices,
		private readonly authTokenRepository: AuthTokenRepository,
		private readonly emailValidateServices: EmailValidateServices,
	) {}

	async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
		try {
			const auth = await this.authRepository.register(payload.email, payload.password);
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
			await this.authTokenRepository.addToken(auth, refreshToken, TokenType.JWTRefreshToken);
		}
		return {
			...accessToken,
			...refreshToken,
			apiKey: null,
			apiKeyExpiration: null,
			withVerificationEmail: false,
			with2FA: false,
			remember,
		};
	}

	async refreshToken(refreshToken: string): Promise<LoginResponseDTO> {
		try {
			const payload = this.jwtServices.validateRefreshToken(refreshToken);
			const auth = await this.authRepository.findOne({
				relations: { authTokens: true },
				where: {
					id: payload.authId,
					authTokens: { token: refreshToken, type: TokenType.JWTRefreshToken },
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
		await this.authTokenRepository.addToken(auth, token, TokenType.JWTBlackAccessToken);
		// await this.authRepository.update({ id }, { refreshToken: null });
	}
}
