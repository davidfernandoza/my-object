import { IsString, IsNotEmpty, MinLength, MaxLength, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDTO } from '@auth/dtos/login.dto';

export class ValidateCodeDTO {
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	@ApiProperty({
		description: 'The api key for identify user',
		example: '0f4c95bdf04c320253620a72ceff...',
	})
	apiKey: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@MaxLength(6)
	@ApiProperty({ description: 'The code for validate account', example: '123456' })
	code: string;

	@IsBoolean()
	@IsOptional()
	readonly remember: boolean;
}

export class ValidateCodeResponseDTO extends LoginResponseDTO {}
