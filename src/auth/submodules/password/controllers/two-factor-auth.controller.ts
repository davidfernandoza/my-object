import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,

	// UsePipes,
	// Param,
	// ParseIntPipe,
	// UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth/2FA')
@Controller('auth/2fa')
export class TwoFactorAuthController {
	@Get('hola')
	@HttpCode(HttpStatus.CREATED)
	async register() {
		return 'hola';
	}
}

// @Post('2fa/validate-code')
// @Post('2fa/change-status')
