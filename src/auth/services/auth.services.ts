import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthInterface } from '@src/auth/interfaces/auth.interface';
import { Auth } from '@src/auth/entities/auth.entity';
import { MessagesServices } from '@common/services/messages.services';
import { LoginDTO, LogoutDTO, RegisterDTO } from '@src/auth/dtos/auth.dto';

@Injectable()
export class AuthServices implements AuthInterface {
	private readonly MS: MessagesServices;
	private auths: Auth[] = [
		{
			id: 1,
			email: 'admin@email.com',
			password: 'secret123!',
		},
	];

	constructor() {
		this.MS = new MessagesServices();
	}

	async login(payload: LoginDTO): Promise<Auth> | never {
		return await new Promise((resolve, reject) => {
			const product = this.auths.find(item => item.email === payload.email);
			const user = new Auth();
			if (!product) {
				reject(new NotFoundException(this.MS.send(HttpStatus.NOT_FOUND)));
			}
			resolve({ ...user, ...product });
		});
	}

	async register(payload: RegisterDTO): Promise<Auth> {
		return await new Promise(resolve => {
			if (payload.email) {
				resolve(this.auths[0]);
			}
		});
	}

	async logout(payload: LogoutDTO): Promise<Auth[]> {
		return await new Promise(resolve => {
			if (payload.token) {
				resolve(this.auths);
			}
		});
	}
}
