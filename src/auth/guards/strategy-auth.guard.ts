import passport from 'passport';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class StrategyAuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();
		return new Promise((resolve, reject) => {
			/*
			 * Se invoca passport.authenticate con el array de las estrategias
			 * que se quieren utilizar
			 */
			passport.authenticate(['jwt'], { session: false }, (err: any, auth: any) => {
				if (err || !auth) return reject(new UnauthorizedException());
				request.auth = auth;
				return resolve(true);
			})(request, response, () => {});
		});
	}
}
