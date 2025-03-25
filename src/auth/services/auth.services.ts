import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Auth } from '@database/entities/auth/auth.entity';
import { RegisterDTO, RegisterResponseDTO } from '@auth/dtos/register.dto';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { TemplateService } from '@common/services/template.service';
import { HelperService } from '@common/services/helper.service';
import { MailService } from '@common/services/mail.service';
import { LoginResponseDTO } from '@auth/dtos/login.dto';
import { JwtServices } from '@auth/services/jwt.services';
import { IAuthService } from '@auth/interfaces/auth-service.interface';
import { JWTBlacklistRepository } from '@database/repositories/auth/auth-token.repository';

@Injectable()
export class AuthServices implements IAuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly templateService: TemplateService,
		private readonly helperService: HelperService,
		private readonly mailService: MailService,
		private readonly jwtServices: JwtServices,
		private readonly jwtBlacklistRepository: JWTBlacklistRepository,
	) {}

	async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
		try {
			const code = this.helperService.generateCode(6);
			const view = this.templateService.compile('verify.email', { code });
			const newAuth = this.authRepository.create({ ...payload, code_verification: Number(code) });
			let auth = await this.authRepository.save(newAuth);
			this.mailService.sendEmail({
				to: [payload.email],
				subject: 'Creación de cuenta en My Object',
				message: view,
				type: 'html',
				engine: 'nodemailer',
			});
			const tokens = this.login(auth);
			auth = plainToInstance(Auth, auth);
			return { auth, tokens };
		} catch (error) {
			console.error(error, '****************');
			throw new InternalServerErrorException(error.message);
		}
	}

	public async validateAuth(email: string, password: string): Promise<Auth> {
		const auth = await this.authRepository.findOneBy({ email });
		if (auth && (await auth.comparePassword(password))) {
			return auth;
		}
		throw new UnauthorizedException('Credentials invalid');
	}

	public login(auth: Auth): LoginResponseDTO {
		const payload = { id: auth.id };
		const access_token = this.jwtServices.generateAccessToken(payload);
		const refresh_token = this.jwtServices.generateRefreshToken(payload);
		this.authRepository.update(auth.id, { ...refresh_token });
		return { ...access_token, ...refresh_token };
	}

	async refreshToken(refreshToken: string): Promise<LoginResponseDTO> {
		try {
			const payload = this.jwtServices.validateRefreshToken(refreshToken);
			const auth = await this.authRepository.findOne({
				where: { id: payload.auth_id },
			});
			if (!auth || auth.refresh_token !== refreshToken) {
				throw new UnauthorizedException('Token unavaliable');
			}
			return this.login(auth);
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}

	async logout(id: number, token: string): Promise<void> {
		const auth = await this.authRepository.getOneById(id);
		if (!auth) throw new UnauthorizedException();
		await this.jwtBlacklistRepository.addToken(auth, token);
		await this.authRepository.update({ id }, { refresh_token: null });
	}
}
