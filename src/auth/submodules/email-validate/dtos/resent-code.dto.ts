import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterResponseDTO } from '@auth/dtos/register.dto';

export class ResentCodeDTO {
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	@ApiProperty({
		description: 'The api key for identify user',
		example: '0f4c95bdf04c320253620a72ceff...',
	})
	apiKey: string;
}

export class ResentCodeResponseDTO extends RegisterResponseDTO {}
