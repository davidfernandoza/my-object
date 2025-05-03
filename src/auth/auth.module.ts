import { Module, Global, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthServices } from '@auth/services/auth.service';
import { JwtServices } from '@auth/services/jwt.service';
import { AuthController } from '@auth/controllers/auth.controller';
import { MessagesService } from '@common/services/messages.service';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { TwoFactorAuthModule } from '@auth/submodules/2FA/two-factor-auth.module';
import { EmailValidateAuthModule } from '@auth/submodules/email-validate/email-validate-auth.module';
import { TwoFactorAuthService } from '@auth/submodules/2FA/services/two-factor-auth.service';
import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.service';

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
	providers: [AuthServices, JwtServices, JwtStrategy, TwoFactorAuthService, EmailValidateServices],
	exports: [AuthServices, JwtServices, JwtStrategy],
})
export class AuthModule {}
