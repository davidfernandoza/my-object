import { Module, Global, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthServices } from '@auth/services/auth.services';
import { JwtServices } from '@auth/services/jwt.services';
import { AuthController } from '@auth/controllers/auth.controller';
import { MessagesService } from '@common/services/messages.service';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { TwoFactorAuthModule } from '@auth/submodules/2FA/two-factor-auth.module';
import { EmailValidateAuthModule } from '@auth/submodules/email-validate/email-validate-auth.module';

@Global()
@Module({
	imports: [
		PassportModule,
		MessagesService,
		JwtModule,
		TwoFactorAuthModule,
		forwardRef(() => EmailValidateAuthModule),
	],
	controllers: [AuthController],
	providers: [AuthServices, JwtServices, JwtStrategy],
	exports: [AuthServices, JwtServices, JwtStrategy],
})
export class AuthModule {}
