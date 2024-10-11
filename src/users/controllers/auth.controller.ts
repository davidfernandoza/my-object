import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto, LogoutDto, RegisterDto } from 'src/users/dtos/auth.dto';
import { AuthServices } from 'src/users/services/auth.services';
import { AuthInterface } from '../interfaces/auth.interface';

@Controller('auth')
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
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Body() payload: LogoutDto) {
		return await this.authServices.logout(payload);
	}
}
