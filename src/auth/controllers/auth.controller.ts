import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	// UseGuards,
	// UsePipes,
	// Param,
	// ParseIntPipe,
	// UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterDTO } from '@auth/dtos/register.dto';
// import { LoginDTO } from '@auth/dtos/login.dto';

import { AuthServices } from '@auth/services/auth.services';
import { IAuthService } from '@src/auth/interfaces/auth-service.interface';
// import { IdRequiredPipe } from '@common/decorators/pipes/id-required.pipe';
// import { AddIdInBodyInterceptor } from '@common/interceptors/add-id-in-body.interceptor';
// import { ApiKeyGuard } from '@auth/guards/api-key.guard';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
	private authServices: IAuthService;

	constructor(private readonly authServicesSingleton: AuthServices) {
		this.setAuthServices(this.authServicesSingleton);
	}

	setAuthServices(authServices: IAuthService) {
		this.authServices = authServices;
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	// @UsePipes(IdRequiredPipe)
	// @UseInterceptors(AddIdInBodyInterceptor)
	async register(@Body() body: RegisterDTO) {
		return await this.authServices.register(body);
	}

	// @Post('login')
	// // @UseGuards(ApiKeyGuard)
	// @HttpCode(HttpStatus.ACCEPTED)
	// async login(@Body() payload: LoginDTO) {
	// 	console.log('hola');

	// 	return await this.authServices.login(payload);
	// }

	// @Post('logout')
	// @UseGuards(ApiKeyGuard)
	// @HttpCode(HttpStatus.NO_CONTENT)
	// async logout(@Body() payload: LogoutDTO) {
	// 	return await this.authServices.logout(payload);
	// }
}
