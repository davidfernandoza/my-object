import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDTO } from '@auth/dtos/login.dto';

export class ResentCodeDTO {
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	@ApiProperty({
		description: 'The api key for identify user',
		example: '0f4c95bdf04c320253620a72ceff...',
	})
	apiKey: string;

	@IsBoolean()
	@IsOptional()
	readonly remember: boolean;
}

export class ResentCodeResponseDTO extends LoginResponseDTO {}
