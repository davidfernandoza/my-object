import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
	@ApiProperty({
		description: 'Nombres del usuario',
		example: 'John',
	})
	@IsString()
	@IsNotEmpty()
	names: string;

	@ApiProperty({
		description: 'Apellidos del usuario',
		example: 'Doe',
	})
	@IsString()
	@IsNotEmpty()
	last_names: string;

	@ApiProperty({
		description: 'Número de identificación del usuario',
		example: 123456789,
		type: Number,
	})
	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => value.toString())
	identification_number: string;

	@ApiProperty({
		description: 'Teléfono del usuario',
		example: '3101234567',
		required: false,
	})
	@IsString()
	@IsOptional()
	phone?: string;

	@ApiProperty({
		description: 'ID de la ciudad asociada al usuario',
		example: 1,
	})
	@IsNumber()
	@IsNotEmpty()
	city_id: number;

	@ApiProperty({
		description: 'ID del tipo de identificación del usuario',
		example: 2,
	})
	@IsNumber()
	@IsNotEmpty()
	identification_type_id: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
