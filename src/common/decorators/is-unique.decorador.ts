import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

interface IsUniqueOptions {
	entity: any;
	column: string;
	update: boolean;
}

// Esta es la funcion que utiliza la libreria para crear el decorador
export function IsUnique(options: IsUniqueOptions, validationOptions?: ValidationOptions) {
	// Decorador
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'IsUnique',
			target: object.constructor, // Clase del DTO (nombre del DTO)
			propertyName: propertyName, // Campo en el DTO
			options: validationOptions, // Opciones de validación como mensajes de error
			constraints: [options], // Argumentos personalizados: entidad y campo
			validator: IsUniqueConstraint, // Clase que contiene la lógica de validación
		});
	};
}

// Logica de validación
@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

	// Función que realiza la validación que utiliza la interfaz del validador
	async validate(value: any, args: any): Promise<boolean> {
		const [options] = args.constraints; // Obtenemos las opciones
		const { entity, column, update } = options;
		const repository = this.dataSource.getRepository(entity);
		let id: any;

		if (update) {
			id = (args.object as any).id; // Accede al campo 'id' del DTO
			if (!id) throw new BadRequestException('id is required for update.');
		}

		const query = !update
			? { where: { [column]: value } }
			: { where: { [column]: value, id: Not(id) } };

		// Realizamos la búsqueda en la base de datos
		const record = await repository.findOne(query);
		return !record; // Retorna true si no hay registros
	}

	// Este es el mensaje por defecto que utiliza la interfaz del validador
	defaultMessage(args: any): string {
		const [options] = args.constraints;
		const { column } = options;
		return `${column} already exists.`;
	}
}
