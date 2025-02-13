import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@config/app.config';
import { IJwtPayload } from '@auth/interfaces/jwt-service.interface';

@Injectable()
export class JwtServices {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public generateAccessToken(payload: IJwtPayload) {
		return {
			access_token: this.jwtService.sign(payload, {
				secret: this.configService.getConfig().jwt.access_secret,
				expiresIn: this.configService.getConfig().jwt.access_expiration,
			}),
		};
	}

	public generateRefreshToken(payload: IJwtPayload) {
		return {
			refresh_token: this.jwtService.sign(payload, {
				secret: this.configService.getConfig().jwt.refresh_secret,
				expiresIn: this.configService.getConfig().jwt.refresh_expiration,
			}),
		};
	}
}
