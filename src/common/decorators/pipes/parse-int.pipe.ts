import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
	transform(value: any): number {
		const valueParsed = parseInt(value, 10); // Intenta convertir el valor a número
		if (isNaN(valueParsed)) {
			throw new BadRequestException(`Validation failed. "${value}" is not a valid number.`);
		}
		return valueParsed; // Retorna el número transformado
	}
}
