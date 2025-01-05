import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDTO, LogoutDTO, RegisterDTO } from '@src/auth/dtos/auth.dto';
import { AuthServices } from '@auth/services/auth.services';
import { AuthInterface } from '@auth/interfaces/auth.interface';
import { ApiKeyGuard } from '@auth/guards/api-key.guard';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
	private authServices: AuthInterface;

	constructor(private readonly authServicesSingleton: AuthServices) {
		// this.setAuthServices(this.authServicesSingleton);
	}

	setAuthServices(authServices: AuthInterface) {
		this.authServices = authServices;
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() payload: RegisterDTO) {
		return await this.authServices.register(payload);
	}

	@Post('login')
	// @UseGuards(ApiKeyGuard)
	@HttpCode(HttpStatus.ACCEPTED)
	async login(@Body() payload: LoginDTO) {
		console.log('hola');

		return await this.authServices.login(payload);
	}

	@Post('logout')
	@UseGuards(ApiKeyGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Body() payload: LogoutDTO) {
		return await this.authServices.logout(payload);
	}
}
