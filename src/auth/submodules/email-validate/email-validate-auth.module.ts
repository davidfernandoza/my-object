import { forwardRef, Module } from '@nestjs/common';

import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.service';
import { EmailValidateController } from '@auth/submodules/email-validate/controllers/email-validate.controller';
import { AuthModule } from '@auth/auth.module';

@Module({
	imports: [
		forwardRef(() => AuthModule), //esto se hace si hay dependencias circulares
	],
	controllers: [EmailValidateController],
	providers: [EmailValidateServices],
	exports: [EmailValidateServices],
})
export class EmailValidateAuthModule {}
