import { Auth } from '@database/entities/auth/auth.entity';

export interface ITwoFactorAuthService {
	changeActivation(
		id: number,
		with2FA: boolean,
	): Promise<{ qrCode: string | null; status: boolean }>;
	validateCode(code: string, idAuth: number): Promise<boolean>;
	activate2FA(idAuth: number): Promise<void>;
	createApiKey(auth: Auth): Promise<{ apiKey: string; expiration: string }>;
}
