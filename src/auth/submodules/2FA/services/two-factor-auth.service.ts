import { Injectable } from '@nestjs/common';
import { ITwoFactorAuthService } from '@auth/submodules/2FA/interfaces/two-factor-auth-service.interface';

@Injectable()
export class TwoFactorAuthService implements ITwoFactorAuthService {
	constructor() {}

	public async changeActivation(body: any): Promise<any> {
		console.log(body, '********************');
	}
	public async validateCode(): Promise<any> {}
}
