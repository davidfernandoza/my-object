import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	UseGuards,
	Req,
	UnauthorizedException,
	// UsePipes,
	// Param,
	// ParseIntPipe,
	// UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { LoginDTO, LoginResponseDTO } from '@auth/dtos/login.dto';

import { AuthServices } from '@auth/services/auth.services';
import { IAuthService, IAuthRequest } from '@auth/interfaces/auth-service.interface';
import { RefreshTokenDTO } from '@auth/dtos/jwt.dto';
import { StrategyAuthGuard } from '@auth/guards/strategy-auth.guard';
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
	async register(@Body() body: RegisterDTO): Promise<RegisterResponseDTO> {
		return await this.authServices.register(body);
	}

	@Post('login')
	@HttpCode(HttpStatus.ACCEPTED)
	async login(@Body() payload: LoginDTO): Promise<LoginResponseDTO> {
		const { email, password, remember } = payload;
		const auth = await this.authServices.validateAuth(email, password);
		return this.authServices.login(auth, remember);
	}

	@Post('refresh-token')
	@HttpCode(HttpStatus.ACCEPTED)
	async refreshToken(@Body() payload: RefreshTokenDTO): Promise<LoginResponseDTO> {
		return await this.authServices.refreshToken(payload.refresh_token);
	}

	@Post('logout')
	@UseGuards(StrategyAuthGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	async logout(@Req() request: IAuthRequest): Promise<void> {
		const authHeader = request.headers['authorization'];
		const accessToken = authHeader && authHeader.split(' ')[1];
		const auth = request.auth;
		if (!accessToken) throw new UnauthorizedException();
		await this.authServices.logout(auth.id, accessToken);
	}
}
