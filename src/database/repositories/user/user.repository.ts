import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@database/entities/user/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
	constructor(
		@InjectRepository(User)
		private readonly repository: Repository<User>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findByIdentificationNumber(identification: string): Promise<User[]> {
		return this.find({ where: { identification_number: identification } });
	}
}
