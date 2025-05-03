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

import { AuthServices } from '@auth/services/auth.service';
import { IAuthService, IAuthRequest } from '@auth/interfaces/auth-service.interface';
import { RefreshTokenDTO } from '@auth/dtos/jwt.dto';
import { StrategyAuthGuard } from '@auth/guards/strategy-auth.guard';
// import { IdRequiredPipe } from '@common/decorators/pipes/id-required.pipe';
// import { AddIdInBodyInterceptor } from '@common/interceptors/add-id-in-body.interceptor';
// import { ApiKeyGuard } from '@auth/guards/api-key.guard';
import { EmailValidateServices } from '@auth/submodules/email-validate/services/email-validate.service';
import { TwoFactorAuthService } from '@auth/submodules/2FA/services/two-factor-auth.service';
import { ITwoFactorAuthService } from '@auth/submodules/2FA/interfaces/two-factor-auth-service.interface';
import { IEmailValidateServices } from '@auth/submodules/email-validate/interfaces/email-validate-services.interface';

@ApiTags('Auth')
@Controller({ path: 'auth' })
export class AuthController {
	private authServices: IAuthService;
	private emailValidateServices: IEmailValidateServices;
	private twoFactorAuthServices: ITwoFactorAuthService;

	constructor(
		private readonly authServicesSingleton: AuthServices,
		private readonly emailValidateServicesSingleton: EmailValidateServices,
		private readonly twoFactorAuthServiceSingleton: TwoFactorAuthService,
	) {
		this.setAuthServices(
			this.authServicesSingleton,
			this.emailValidateServicesSingleton,
			this.twoFactorAuthServiceSingleton,
		);
	}

	setAuthServices(
		authServices: IAuthService,
		emailValidateServices?: IEmailValidateServices,
		twoFactorAuthServices?: ITwoFactorAuthService,
	) {
		this.authServices = authServices;
		this.emailValidateServices = emailValidateServices;
		this.twoFactorAuthServices = twoFactorAuthServices;
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

		if (!auth.verificationEmailDate) {
			const { apiKey, expiration } =
				await this.emailValidateServices.sendVerificationCodeToEmail(auth);
			return {
				accessToken: null,
				refreshToken: null,
				apiKey,
				apiKeyExpiration: expiration,
				withVerificationEmail: false,
				with2FA: null,
				remember,
			};
		}
		if (auth.with2FA && auth.secret2FA) {
			const { apiKey, expiration } = await this.twoFactorAuthServices.createApiKey(auth);
			return {
				accessToken: null,
				refreshToken: null,
				apiKey,
				apiKeyExpiration: expiration,
				withVerificationEmail: true,
				with2FA: true,
				remember,
			};
		}
		return this.authServices.login(auth, remember, false);
	}

	@Post('refresh-token')
	@HttpCode(HttpStatus.ACCEPTED)
	async refreshToken(@Body() payload: RefreshTokenDTO): Promise<LoginResponseDTO> {
		return await this.authServices.refreshToken(payload.refreshToken);
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
