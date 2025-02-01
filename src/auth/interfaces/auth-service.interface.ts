import { Auth } from '@database/entities/auth/auth.entity';
import { RegisterDTO } from '@auth/dtos/register.dto';

export interface IAuthService {
	// login(payload: any): Promise<Auth>;
	register(payload: RegisterDTO): Promise<Auth>;
	// logout(payload: any): Promise<any>;
}
