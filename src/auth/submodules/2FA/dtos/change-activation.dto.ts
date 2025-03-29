import { IsNotEmpty, IsBoolean } from 'class-validator';

export class ChangeActivationDTO {
	@IsBoolean()
	@IsNotEmpty()
	readonly with2FA: boolean;
}
