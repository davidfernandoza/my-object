import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@config/app.config';
import { IJwtPayload } from '@auth/interfaces/jwt-service.interface';
import { JwtServices } from '@auth/services/jwt.services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly jwtServices: JwtServices,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getConfig().jwt.accessSecret,
			ignoreExpiration: false,
			passReqToCallback: true,
		});
	}

	async validate(request: any, payload: IJwtPayload) {
		const authHeader = request.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) throw new UnauthorizedException();

		// Se consulta la lista negra de tokens
		const inBlacklist = await this.jwtServices.inBlacklist(token);
		if (inBlacklist) throw new UnauthorizedException('');
		return { id: payload.id };
	}
}
