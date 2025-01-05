import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthInterface } from '@auth/interfaces/auth.interface';
import { Auth } from '@database/entities/auth/auth.entity';
import { MessagesServices } from '@common/services/messages.services';
import { LoginDTO, LogoutDTO, RegisterDTO } from '@src/auth/dtos/auth.dto';

@Injectable()
// export class AuthServices implements AuthInterface {
export class AuthServices {
	private readonly MS: MessagesServices;

	constructor() {
		this.MS = new MessagesServices();
	}

	// async login(payload: LoginDTO): Promise<Auth> | never {

	// }

	// async register(payload: RegisterDTO): Promise<Auth> {
	// 	return await new Promise(resolve => {
	// 		if (payload.email) {
	// 			resolve(this.auths[0]);
	// 		}
	// 	});
	// }

	// async logout(payload: LogoutDTO): Promise<Auth[]> {
	// 	return await new Promise(resolve => {
	// 		if (payload.token) {
	// 			resolve(this.auths);
	// 		}
	// 	});
	// }
}
