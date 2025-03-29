import {
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Body,
	UseGuards,

	// UsePipes,
	// Param,
	// ParseIntPipe,
	// UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ITwoFactorAuthService } from '@auth/submodules/2FA/interfaces/two-factor-auth-service.interface';
import { TwoFactorAuthService } from '@auth/submodules/2FA/services/two-factor-auth.service';
import { StrategyAuthGuard } from '@auth/guards/strategy-auth.guard';
import { ChangeActivationDTO } from '@auth/submodules/2FA/dtos/change-activation.dto';

@ApiTags('Auth/2FA')
@Controller('auth/2fa')
export class TwoFactorAuthController {
	private twoFactorAuthServices: ITwoFactorAuthService;
	constructor(private readonly twoFactorAuthServiceSingleton: TwoFactorAuthService) {
		this.setAuthServices(this.twoFactorAuthServiceSingleton);
	}

	setAuthServices(twoFactorAuthServices: ITwoFactorAuthService) {
		this.twoFactorAuthServices = twoFactorAuthServices;
	}

	@Post('change-activation')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(StrategyAuthGuard)
	async changeActivation(@Body() body: ChangeActivationDTO) {
		return await this.twoFactorAuthServices.changeActivation(body);
	}
	@Post('validate-code')
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(StrategyAuthGuard)
	async validateCode(@Body() body: any) {
		return await this.twoFactorAuthServices.validateCode(body);
	}
}
