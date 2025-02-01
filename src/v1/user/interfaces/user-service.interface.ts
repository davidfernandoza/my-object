import { User } from '@database/entities/user/user.entity';

export interface IUserService {
	getAll(): Promise<User[]>;
}
