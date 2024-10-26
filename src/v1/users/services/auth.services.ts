import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthInterface } from '@users-v1/interfaces/auth.interface';
import { Auth } from '@users-v1/entities/auth.entity';
import { MessagesServices } from '@common-v1/services/messages.services';
import { LoginDto, LogoutDto, RegisterDto } from '@users-v1/dtos/auth.dto';

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

	async login(payload: LoginDto): Promise<Auth> | never {
		return await new Promise((resolve, reject) => {
			const product = this.auths.find(item => item.email === payload.email);
			if (!product) {
				reject(new NotFoundException(this.MS.send(HttpStatus.NOT_FOUND)));
			}
			resolve(product);
		});
	}

	async register(payload: RegisterDto): Promise<Auth> {
		return await new Promise(resolve => {
			if (payload.email) {
				resolve(this.auths[0]);
			}
		});
	}

	async logout(payload: LogoutDto): Promise<Auth[]> {
		return await new Promise(resolve => {
			if (payload.token) {
				resolve(this.auths);
			}
		});
	}
}
