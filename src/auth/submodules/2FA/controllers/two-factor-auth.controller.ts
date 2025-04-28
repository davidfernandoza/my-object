import {
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Body,
	UseGuards,
	Req,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ITwoFactorAuthService } from '@auth/submodules/2FA/interfaces/two-factor-auth-service.interface';
import { TwoFactorAuthService } from '@auth/submodules/2FA/services/two-factor-auth.service';
import { StrategyAuthGuard } from '@auth/guards/strategy-auth.guard';
import { ChangeActivationDTO } from '@auth/submodules/2FA/dtos/change-activation.dto';
import { IAuthRequest, IAuthService } from '@auth/interfaces/auth-service.interface';
import { ValidateCodeDTO } from '@auth/submodules/2FA/dtos/validate-code.dto';
import { AuthServices } from '@auth/services/auth.services';
import { ValidateActivationDTO } from '@auth/submodules/2FA/dtos/validate-activation.dto';

@ApiTags('Auth/2FA')
@Controller('auth/2fa')
export class TwoFactorAuthController {
	private twoFactorAuthServices: ITwoFactorAuthService;
	private authServices: IAuthService;

	constructor(
		private readonly twoFactorAuthServiceSingleton: TwoFactorAuthService,
		private readonly authServicesSingleton: AuthServices,
	) {
		this.setAuthServices(this.twoFactorAuthServiceSingleton, this.authServicesSingleton);
	}

	setAuthServices(twoFactorAuthServices: ITwoFactorAuthService, authServices: IAuthService) {
		this.twoFactorAuthServices = twoFactorAuthServices;
		this.authServices = authServices;
	}

	@Post('change-activation')
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(StrategyAuthGuard)
	async changeActivation(@Req() request: IAuthRequest, @Body() body: ChangeActivationDTO) {
		const auth = request.auth;
		const { with2FA, code } = body;
		if (!with2FA) {
			if (!(await this.twoFactorAuthServices.validateCode(code, auth.id))) {
				throw new BadRequestException('Invalid code');
			}
		}
		return await this.twoFactorAuthServices.changeActivation(auth.id, with2FA);
	}

	@Post('validate-activation')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(StrategyAuthGuard)
	async validateActivation(@Req() request: IAuthRequest, @Body() body: ValidateActivationDTO) {
		const auth = request.auth;
		const { code } = body;
		if (!(await this.twoFactorAuthServices.validateCode(code, auth.id))) {
			throw new BadRequestException('Invalid code');
		}
		return await this.twoFactorAuthServices.activate2FA(auth.id);
	}

	@Post('validate-code')
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(StrategyAuthGuard)
	async validateCode(@Req() request: IAuthRequest, @Body() body: ValidateCodeDTO) {
		const { apiKey, code, remember } = body;
		const authToken = await this.authServices.getAuthByApiKey(apiKey);
		if (!authToken) {
			throw new UnauthorizedException('Invalid API key');
		}
		if (!(await this.twoFactorAuthServices.validateCode(code, request.auth.id))) {
			throw new BadRequestException('Invalid code');
		}
		const auth = authToken.auth;
		return await this.authServices.login(auth, remember);
	}
}
