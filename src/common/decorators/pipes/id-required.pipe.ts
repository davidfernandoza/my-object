import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdRequiredPipe implements PipeTransform {
	transform(value: any) {
		if (!value) {
			throw new BadRequestException('id is required.');
		}
		return value; // Continúa con el procesamiento si el ID está presente
	}
}
