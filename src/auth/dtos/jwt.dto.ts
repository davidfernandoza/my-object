import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class JwtDTO {
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(20)
	readonly token: string;
}

export class RefreshTokenDTO {
	@IsString()
	@IsNotEmpty()
	@MinLength(10)
	readonly refresh_token: string;
}
