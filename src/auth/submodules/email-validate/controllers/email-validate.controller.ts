import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IEmailValidateServices } from '@auth/submodules/email-validate/interfaces/email-validate-services.interface';
import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.service';
import { ValidateCodeDTO } from '@auth/submodules/email-validate/dtos/validate-code.dto';
import { AuthServices } from '@auth/services/auth.service';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import {
	ResentCodeDTO,
	ResentCodeResponseDTO,
} from '@auth/submodules/email-validate/dtos/resent-code.dto';

@ApiTags('Auth/EmailValidate')
@Controller('auth/email-validate')
export class EmailValidateController {
	private emailValidateServices: IEmailValidateServices;
	private authServices: IAuthService;

	constructor(
		private readonly emailValidateServicesingleton: EmailValidateServices,
		private readonly authServicesSingleton: AuthServices,
	) {
		this.setAuthServices(this.emailValidateServicesingleton, this.authServicesSingleton);
	}

	setAuthServices(emailValidateServices: IEmailValidateServices, authServices: IAuthService) {
		this.emailValidateServices = emailValidateServices;
		this.authServices = authServices;
	}

	@Post('validate-code')
	@HttpCode(HttpStatus.ACCEPTED)
	async validateCode(@Body() body: ValidateCodeDTO): Promise<any> {
		const auth = await this.emailValidateServices.validateAccount(body.apiKey, body.code);
		return await this.authServices.login(auth, body.remember ?? false, false);
	}

	@Post('resent-code')
	@HttpCode(HttpStatus.ACCEPTED)
	async resentCode(@Body() body: ResentCodeDTO): Promise<ResentCodeResponseDTO> {
		return await this.emailValidateServices.resentCode(body.apiKey, body.remember ?? false);
	}
}
