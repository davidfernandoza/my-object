import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@config/app.config';
import { IJwtPayload } from '@auth/interfaces/jwt-service.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getConfig().jwt.access_secret,
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	async validate(request: any, payload: IJwtPayload) {
		const authHeader = request.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) throw new UnauthorizedException();

		// Se consulta la lista negra de tokens
		// const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(token);
		// if (isBlacklisted) throw new UnauthorizedException('');
		console.log(token);

		return { auth_id: payload.auth_id };
	}
}
