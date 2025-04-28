import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { Auth } from '@database/entities/auth/auth.entity';
import { Request } from 'express';
import { AuthToken } from '@database/entities/auth/auth-token.entity';

export interface IAuthService {
	login(auth: Auth, remember: boolean): Promise<LoginResponseDTO>;
	register(payload: RegisterDTO): Promise<RegisterResponseDTO>;
	validateAuth(email: string, password: string): Promise<Auth> | null;
	refreshToken(refreshToken: string): Promise<LoginResponseDTO>;
	logout(idAuth: number, token: string): Promise<void>;
	getAuthByApiKey(apiKey: string): Promise<AuthToken>;
}

export interface IAuthRequest extends Request {
	auth?: { id: number };
}
