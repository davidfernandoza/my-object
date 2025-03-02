import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@config/app.config';
import { IJwtPayload } from '@auth/interfaces/jwt-service.interface';
import { JWTBlacklistRepository } from '@database/repositories/auth/jwt-blacklist.repository';

@Injectable()
export class JwtServices {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly jwtBlacklistRepository: JWTBlacklistRepository,
	) {}

	public generateAccessToken(payload: IJwtPayload): { access_token: string } {
		return {
			access_token: this.jwtService.sign(payload, {
				secret: this.configService.getConfig().jwt.accessSecret,
				expiresIn: this.configService.getConfig().jwt.accessExpiration,
			}),
		};
	}

	public generateRefreshToken(payload: IJwtPayload): { refresh_token: string } {
		return {
			refresh_token: this.jwtService.sign(payload, {
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
		const blacklistedToken = await this.jwtBlacklistRepository.getToken(token);
		return !!blacklistedToken;
	}
}
