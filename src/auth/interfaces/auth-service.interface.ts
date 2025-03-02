import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { Auth } from '@database/entities/auth/auth.entity';
import { Request } from 'express';

export interface IAuthService {
	login(payload: Auth): LoginResponseDTO;
	register(payload: RegisterDTO): Promise<RegisterResponseDTO>;
	validateAuth(email: string, password: string): Promise<Auth> | null;
	refreshToken(refreshToken: string): Promise<LoginResponseDTO>;
	logout(authId: number, token: string): Promise<void>;
}

export interface IAuthRequest extends Request {
	auth?: { id: number };
}
