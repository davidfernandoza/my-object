import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LogoutDTO {
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly token: string;
}
