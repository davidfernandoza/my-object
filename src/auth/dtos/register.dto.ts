import {
	IsString,
	IsNotEmpty,
	IsEmail,
	MinLength,
	MaxLength,
	// IsOptional,
} from 'class-validator';

// import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '@common/decorators/is-unique.decorador';
import { Auth } from '@database/entities/auth/auth.entity';

export class RegisterDTO {
	// @ApiHideProperty()
	// @IsOptional()
	// id: number;

	@IsEmail()
	@IsNotEmpty()
	@IsString()
	@MaxLength(120)
	@IsUnique({ entity: Auth, column: 'email', update: false })
	@ApiProperty({ description: 'The email of the user', example: 'foo@example.com' })
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(15)
	@ApiProperty({ description: 'The password of the user', example: 'secret123456' })
	password: string;
}

export class RegisterResponseDTO {
	auth: Auth;
	tokens: object;
}
