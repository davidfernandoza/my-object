import { Injectable, HttpStatus, InternalServerErrorException } from '@nestjs/common';

import { Auth } from '@database/entities/auth/auth.entity';
import { MessagesService } from '@common/services/messages.service';
import { RegisterDTO } from '@auth/dtos/register.dto';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { TemplateService } from '@common/services/template.service';
import { HelperService } from '@common/services/helper.service';
import { MailService } from '@common/services/mail.service';

@Injectable()
export class AuthServices {
	private readonly MS: MessagesService;

	constructor(
		private readonly authRepository: AuthRepository,
		private readonly templateService: TemplateService,
		private readonly helperService: HelperService,
		private readonly mailService: MailService,
	) {
		this.MS = new MessagesService();
	}

	async register(payload: RegisterDTO): Promise<Auth> {
		try {
			const code = this.helperService.generateCode(6);
			const view = this.templateService.compile('verify.email', { code });
			const newAuth = this.authRepository.create({ ...payload, code_verification: Number(code) });
			const register = await this.authRepository.save(newAuth);
			this.mailService.sendEmail({
				to: [payload.email],
				subject: 'Creación de cuenta en My Object',
				message: view,
				type: 'html',
				engine: 'nodemailer',
			});
			return register;
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				throw new InternalServerErrorException(this.MS.send(HttpStatus.INTERNAL_SERVER_ERROR), {
					description: error.message,
				});
			}
			throw new InternalServerErrorException(this.MS.send(HttpStatus.INTERNAL_SERVER_ERROR));
		}
	}
}
