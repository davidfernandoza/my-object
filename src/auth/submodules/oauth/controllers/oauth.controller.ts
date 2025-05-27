import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { IOauthService } from '@auth/submodules/oauth/interfaces/oauth.interface';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import { AuthServices } from '@auth/services/auth.service';
import { OauthService } from '@auth/submodules/oauth/services/oauth.service';
import { ConfigService } from '@config/app.config';
import { ValidationOAuthDTO } from '@auth/submodules/oauth/dtos/validate-oauth.dto';
import { TokenType } from '@database/enums/auth/auth-token.enum';
import { LoginResponseDTO } from '@auth/dtos/login.dto';

@ApiTags('Auth/Oauth')
@Controller('auth/oauth')
export class OauthController {
	private oauthServices: IOauthService;
	private authServices: IAuthService;

	constructor(
		private readonly oauthServiceSingleton: OauthService,
		private readonly authServicesSingleton: AuthServices,
		private readonly configService: ConfigService,
	) {
		this.setServices(this.oauthServiceSingleton, this.authServicesSingleton);
	}

	setServices(oauthServices: IOauthService, authServices: IAuthService) {
		this.oauthServices = oauthServices;
		this.authServices = authServices;
	}

	@Get('get-into-google')
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AuthGuard('google'))
	getIntoGoogle(): void {}

	@Get('google-callback')
	@UseGuards(AuthGuard('google'))
	async googleCallback(@Req() request, @Res() response) {
		const auth = await this.oauthServices.getOrCreateGoogleUser(request.user.email);
		const { apiKey } = await this.oauthServices.createApiKey(auth);
		return response.redirect(
			`${this.configService.getConfig().oauth.urlFrontRedirect}?apiKey=${apiKey}`,
		);
	}

	@Post('login')
	@HttpCode(HttpStatus.ACCEPTED)
	async validateCode(@Body() body: ValidationOAuthDTO): Promise<LoginResponseDTO> {
		const { apiKey, remember } = body;
		const authToken = await this.authServices.getAuthByApiKey(apiKey, TokenType.OauthApiKey);
		if (!authToken) throw new UnauthorizedException('Invalid API key');
		const auth = authToken.auth;
		await this.oauthServices.deleteOauthTokens(auth);
		return await this.authServices.login(auth, remember, null);
	}

	@Get('front-test')
	async frontTest(@Req() request) {
		return request.query.apiKey;
	}
}
