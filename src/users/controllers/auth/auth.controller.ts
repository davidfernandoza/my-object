import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto, LogoutDto, RegisterDto } from 'src/users/dtos/auth.dto';

@Controller('auth')
export class AuthController {

	@Post('register')
	register(@Body() payload: RegisterDto) {
		return {
			login: true
		}
	}

	@Post('login')
	login(@Body() payload: LoginDto) {
		return {
			login: true
		}
	}

	@Post('logout')
	logout(@Body() payload: LogoutDto) {
		return {
			login: true
		}
	}
}
