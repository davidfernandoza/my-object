import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { LoginDto, LogoutDto, RegisterDto } from '@users-v1/dtos/auth.dto';
import { AuthServices } from '@users-v1/services/auth.services';
import { AuthInterface } from '@users-v1/interfaces/auth.interface';
import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';

@Controller('v1/auth')
export class AuthController {
	private authServices: AuthInterface;

	constructor() {
		this.setAuthServices(new AuthServices());
	}

	setAuthServices(authServices: AuthInterface) {
		this.authServices = authServices;
	}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() payload: RegisterDto) {
		return await this.authServices.register(payload);
	}

	@Post('login')
	@HttpCode(HttpStatus.ACCEPTED)
	async login(@Body() payload: LoginDto) {
		return await this.authServices.login(payload);
	}

	@Post('logout')
	@UseGuards(ApiKeyGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Body() payload: LogoutDto) {
		return await this.authServices.logout(payload);
	}
}
