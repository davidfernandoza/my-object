import { Auth } from '@database/entities/auth/auth.entity';
import { ResentCodeResponseDTO } from '@auth/submodules/email-validate/dtos/resent-code.dto';

export interface IEmailValidateServices {
	generateSalt(): Promise<string>;
	generateToken(code: string): Promise<string>;
	sendVerificationCodeToEmail(auth: Auth): Promise<{ apiKey: string; expiration: string }>;
	validateAccount(apiKey: string, code: string): Promise<Auth>;
	resentCode(apiKey: string): Promise<ResentCodeResponseDTO>;
}
