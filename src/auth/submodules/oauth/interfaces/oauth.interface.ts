import { Auth } from '@database/entities/auth/auth.entity';

export interface IOauthService {
	getOrCreateGoogleUser(email: string): Promise<Auth>;
	createApiKey(auth: Auth): Promise<{ apiKey: string; expiration: string }>;
	deleteOauthTokens(auth: Auth): Promise<void>;
}
