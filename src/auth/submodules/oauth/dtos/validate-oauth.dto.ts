import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationOAuthDTO {
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	@ApiProperty({
		description: 'The api key for identify user',
		example: '0f4c95bdf04c320253620a72ceff...',
	})
	apiKey: string;

	@IsNotEmpty()
	@IsBoolean()
	readonly remember: boolean;
}
