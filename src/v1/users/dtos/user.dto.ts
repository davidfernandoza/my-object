import { IsString, IsNotEmpty, IsEmail } from 'class-validator'; //validaciones

// import { PartialType } from '@nestjs/mapped-types'; //permite que un DTO herede de otro, sin que todos los campos sean obligatorios

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;
}
