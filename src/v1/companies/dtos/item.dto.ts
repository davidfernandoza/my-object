import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt } from 'class-validator'; //validaciones

export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	@IsInt()
	readonly companie_id: number;
}

export class UpdateItemDto extends CreateItemDto {}
