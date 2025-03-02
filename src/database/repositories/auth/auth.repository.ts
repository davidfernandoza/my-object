import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Auth } from '@database/entities/auth/auth.entity';

@Injectable()
export class AuthRepository extends Repository<Auth> {
	constructor(
		@InjectRepository(Auth)
		private readonly repository: Repository<Auth>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getOneById(id: number) {
		return await this.findOne({ where: { id } });
	}
}
