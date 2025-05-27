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
import { OauthService } from '@auth/submodules/oauth/services/oauth.service';
import { GoogleStrategy } from '@auth/strategies/google.strategy';
import { OauthModule } from '@auth/submodules/oauth/oauth.module';

@Global()
@Module({
	imports: [
		PassportModule,
		MessagesService,
		JwtModule,
		TwoFactorAuthModule,
		OauthModule,
		forwardRef(() => EmailValidateAuthModule),
	],
	controllers: [AuthController],
	providers: [
		AuthServices,
		JwtServices,
		JwtStrategy,
		TwoFactorAuthService,
		EmailValidateServices,
		OauthService,
		GoogleStrategy,
	],
	exports: [AuthServices, JwtServices, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
