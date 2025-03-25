import { Injectable } from '@nestjs/common';

// import { TokenType } from '@database/enums/auth/auth-token.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VerificationEmailServices {
	private readonly salt: number = 5;

	constructor() {}

	async generateSalt(): Promise<string> {
		return await bcrypt.genSalt(this.salt);
	}

	async generateToken(code: string) {
		const salt = await this.generateSalt();
		return bcrypt.hash(code, salt);
	}
}
