import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { JWTBlacklist } from '@database/entities/auth/jwt-blacklist.entity';
import { Auth } from '@database/entities/auth/auth.entity';

@Injectable()
export class JWTBlacklistRepository extends Repository<JWTBlacklist> {
	constructor(
		@InjectRepository(JWTBlacklist)
		private readonly repository: Repository<JWTBlacklist>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getToken(token: string): Promise<JWTBlacklist> {
		return await this.findOne({ where: { token } });
	}

	async addToken(auth: Auth, token: string): Promise<JWTBlacklist> {
		const newJWTBlackList = this.create({ token });
		newJWTBlackList.auth = auth;
		return await this.save(newJWTBlackList);
	}
}
