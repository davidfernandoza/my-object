import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'; //validaciones

export class LoginDTO {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly password: string;
}

export class LoginResponseDTO {
	readonly accessToken: string;
	readonly refreshToken: string;
}
