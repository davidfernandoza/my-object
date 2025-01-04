import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator'; //validaciones
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDTO {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'The name of the item' })
	readonly name: string;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	@IsInt()
	@ApiProperty({ description: 'The id of the company' })
	readonly companie_id: number;
}

export class UpdateItemDTO extends CreateItemDTO {}
