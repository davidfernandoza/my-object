import { IsNotEmpty, IsBoolean, ValidateIf, IsString } from 'class-validator';

export class ChangeActivationDTO {
	@IsBoolean()
	@IsNotEmpty()
	readonly with2FA: boolean;

	@ValidateIf(dto => dto.with2FA === false)
	@IsNotEmpty()
	@IsString()
	readonly code?: string;
}
