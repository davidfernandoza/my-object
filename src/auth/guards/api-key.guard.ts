import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
	Inject,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { MessagesService } from '@src/common/services/messages.service';
import { IS_PUBLIC_KEY } from '@common/decorators/is-public.decorator';
import { GET_POKEMONS } from '@config/concept-test.config';
import { appConfig } from '@config/app.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
	private readonly MS: MessagesService;
	constructor(
		private reflector: Reflector,
		@Inject(GET_POKEMONS) private pokemons: any[],
		/*
		 * Es una forma de inyectar a la variable de configuracion y que esta misma
		 * le ayude a tipar la variables de entorno.
		 */
		@Inject(appConfig.KEY) private config: ConfigType<typeof appConfig>,
	) {
		this.MS = new MessagesService();
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		console.log(this.pokemons);

		// Validacion de metadata inyectada en los metodos del controlador
		const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
		if (isPublic) return true;

		// Validacion de api-key
		const request = context.switchToHttp().getRequest<Request>();
		if (request.header('AuthToken') != this.config.apiKey) {
			throw new UnauthorizedException(this.MS.send(HttpStatus.UNAUTHORIZED));
		}
		return true;
	}
}
