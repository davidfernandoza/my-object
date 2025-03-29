import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@config/app.config';
import { IJwtPayload } from '@auth/interfaces/jwt-service.interface';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class JwtServices {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly authTokenRepository: AuthTokenRepository,
	) {}

	public generateAccessToken(payload: IJwtPayload): { accessToken: string } {
		return {
			accessToken: this.jwtService.sign(payload, {
				secret: this.configService.getConfig().jwt.accessSecret,
				expiresIn: this.configService.getConfig().jwt.accessExpiration,
			}),
		};
	}

	public generateRefreshToken(payload: IJwtPayload): { refreshToken: string } {
		return {
			refreshToken: this.jwtService.sign(payload, {
				secret: this.configService.getConfig().jwt.refreshSecret,
				expiresIn: this.configService.getConfig().jwt.refreshExpiration,
			}),
		};
	}
	public validateAccessToken(token: string) {
		return this.jwtService.verify(token, {
			secret: this.configService.getConfig().jwt.accessSecret,
		});
	}

	public validateRefreshToken(token: string) {
		return this.jwtService.verify(token, {
			secret: this.configService.getConfig().jwt.refreshSecret,
		});
	}

	public async inBlacklist(token: string) {
		const blacklistedToken = await this.authTokenRepository.getToken(
			token,
			TokenType.JWTBlackAccessToken,
		);
		return !!blacklistedToken;
	}
}
