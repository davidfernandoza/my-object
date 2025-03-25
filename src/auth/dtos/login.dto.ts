import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsBoolean } from 'class-validator'; //validaciones

export class LoginDTO {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly password: string;

	@IsBoolean()
	@IsNotEmpty()
	readonly remember: boolean;
}

export class LoginResponseDTO {
	readonly accessToken: string;
	readonly refreshToken: string;
}
