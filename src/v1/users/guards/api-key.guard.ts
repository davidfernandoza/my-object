import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { MessagesServices } from '@common-v1/services/messages.services';

@Injectable()
export class ApiKeyGuard implements CanActivate {
	private readonly MS: MessagesServices;
	constructor(private reflector: Reflector) {
		this.MS = new MessagesServices();
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		// Validacion de metadata inyectada en los metodos del controlador
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
		if (isPublic) return true;

		// Validacion de api-key
		const request = context.switchToHttp().getRequest<Request>();
		if (request.header('AuthToken') != '123456') {
			throw new UnauthorizedException(this.MS.send(HttpStatus.UNAUTHORIZED));
		}
		return true;
	}
}
