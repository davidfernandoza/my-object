import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Auth } from '@database/entities/auth/auth.entity';
import moment from 'moment';

@Injectable()
export class AuthRepository extends Repository<Auth> {
	private readonly monthsForPasswordExpiration = 3;

	constructor(
		@InjectRepository(Auth)
		private readonly repository: Repository<Auth>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getOneById(id: number) {
		return await this.findOne({ where: { id } });
	}
	async getAuthByEmail(email: string) {
		return await this.findOne({ where: { email } });
	}

	async register(email: string, password: string) {
		const passwordExpirationDate = moment()
			.add(this.monthsForPasswordExpiration, 'months')
			.format('YYYY-MM-DD');
		const newAuth = this.create({ email, password, passwordExpirationDate });
		return await this.save(newAuth);
	}
}
