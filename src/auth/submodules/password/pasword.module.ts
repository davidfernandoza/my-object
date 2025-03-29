import { Module } from '@nestjs/common';

import { TwoFactorAuthController } from '@auth/submodules/2FA/controllers/two-factor-auth.controller';
import { TwoFactorAuthService } from '@auth/submodules/2FA/services/two-factor-auth.service';

@Module({
	controllers: [TwoFactorAuthController],
	providers: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
