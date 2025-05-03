import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { Auth } from '@database/entities/auth/auth.entity';
import { Request } from 'express';
import { AuthToken } from '@database/entities/auth/auth-token.entity';
import { TokenType } from '@database/enums/auth/auth-token.enum';

export interface IAuthService {
	login(auth: Auth, remember: boolean, with2FA: boolean | null): Promise<LoginResponseDTO>;
	register(payload: RegisterDTO): Promise<RegisterResponseDTO>;
	validateAuth(email: string, password: string): Promise<Auth> | null;
	refreshToken(refreshToken: string): Promise<LoginResponseDTO>;
	logout(idAuth: number, token: string): Promise<void>;
	getAuthByApiKey(
		apiKey: string,
		tokenTypeApiKey: TokenType,
		tokenType?: TokenType,
	): Promise<AuthToken>;
}

export interface IAuthRequest extends Request {
	auth?: { id: number };
}
