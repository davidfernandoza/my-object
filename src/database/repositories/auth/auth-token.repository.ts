import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthToken } from '@database/entities/auth/auth-token.entity';
import { Auth } from '@database/entities/auth/auth.entity';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class AuthTokenRepository extends Repository<AuthToken> {
	constructor(
		@InjectRepository(AuthToken)
		private readonly repository: Repository<AuthToken>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getToken(token: string, type: TokenType): Promise<AuthToken> {
		return await this.findOne({ where: { token, type } });
	}

	async addToken(
		auth: Auth,
		token: string,
		type: TokenType,
		expiration: string | null = null,
	): Promise<AuthToken> {
		const newToken = this.create({ token, type, expiration });
		newToken.auth = auth;
		return await this.save(newToken);
	}

	async getAuthByApiKey(apiKey: string, tokenTypeApiKey: TokenType): Promise<AuthToken> {
		return await this.createQueryBuilder('token')
			.leftJoinAndSelect('token.auth', 'auth')
			.where('token.token = :apiKey', { apiKey })
			.andWhere('token.type = :tokenTypeApiKey', { tokenTypeApiKey })
			.andWhere('auth.isActive = :isActive', { isActive: true })
			.getOne();
	}

	async getAuthByApiKeyAndToken(
		apiKey: string,
		tokenTypeApiKey: TokenType,
		tokenType: TokenType,
	): Promise<AuthToken> {
		return await this.createQueryBuilder('token')
			.leftJoinAndSelect('token.auth', 'auth')
			.leftJoinAndSelect('auth.authTokens', 'tokens', 'tokens.type = :tokenType', {
				tokenType,
			})
			.where('token.token = :apiKey', { apiKey })
			.andWhere('token.type = :tokenTypeApiKey', { tokenTypeApiKey })
			.andWhere('auth.isActive = :isActive', { isActive: true })
			.getOne();
	}
}
