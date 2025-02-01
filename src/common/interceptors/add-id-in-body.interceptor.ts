import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddIdInBodyInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const id = request.params?.id; // Obtén el ID de la ruta
		request.body.id = id; // Agrega el ID al body de la solicitud
		return next.handle();
	}
}
