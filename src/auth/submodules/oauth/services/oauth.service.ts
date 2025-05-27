import { Injectable } from '@nestjs/common';
import moment from 'moment';
import * as crypto from 'crypto';
import { In } from 'typeorm';

import { IOauthService } from '@auth/submodules/oauth/interfaces/oauth.interface';
import { Auth } from '@database/entities/auth/auth.entity';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { HelperService } from '@common/services/helper.service';
import { AuthTokenRepository } from '@database/repositories/auth/auth-token.repository';
import { TokenType } from '@database/enums/auth/auth-token.enum';

@Injectable()
export class OauthService implements IOauthService {
	private readonly expirationMinutes = 5;

	constructor(
		readonly authRepository: AuthRepository,
		readonly helperService: HelperService,
		readonly authTokenRepository: AuthTokenRepository,
	) {}

	async getOrCreateGoogleUser(email: string): Promise<Auth> {
		const auth = await this.authRepository.getAuthByEmail(email);
		if (auth) return auth;
		return await this.authRepository.register(email, this.helperService.generateString(8));
	}

	async createApiKey(auth: Auth): Promise<{ apiKey: string; expiration: string }> {
		const expiration = moment().add(this.expirationMinutes, 'minute').format('YYYY-MM-DD HH:mm:ss');
		const apiKey = crypto.randomBytes(32).toString('hex');
		await this.deleteOauthTokens(auth);
		await this.authTokenRepository.addToken(auth, apiKey, TokenType.OauthApiKey, expiration);
		return { apiKey, expiration };
	}

	async deleteOauthTokens(auth: Auth): Promise<void> {
		await this.authTokenRepository.delete({
			auth: auth,
			type: In([TokenType.OauthApiKey, TokenType.OauthToken]),
		});
	}
}
