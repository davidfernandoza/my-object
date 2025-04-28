import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateActivationDTO {
	@IsNotEmpty()
	@IsString()
	readonly code: string;
}
