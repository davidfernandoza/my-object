import { Injectable } from '@nestjs/common';

import { UserRepository } from '@database/repositories/user/user.repository';
import { User } from '@database/entities/user/user.entity';
import { IUserService } from '@user-v1/interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAll(): Promise<User[]> {
		return await this.userRepository.find();
	}
}
