import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'; //validaciones

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly password: string;
}

export class RegisterDto extends LoginDto {}

export class LogoutDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly token: string;
}
