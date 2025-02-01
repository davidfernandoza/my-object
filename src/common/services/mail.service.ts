import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@config/app.config';
import { IEmailOption, IObjectForSendEmail } from '@common/interfaces/email-option.interface';

@Injectable()
export class MailService {
	constructor(private readonly configService: ConfigService) {}

	async sendEmail(options: IEmailOption): Promise<void> {
		switch (options.engine) {
			case 'aws':
				return await this.sendEmailWithAWS(options);

			default:
				return await this.sendEmailWithNodemailer(options);
		}
	}

	private getTransporterNodemailer() {
		const { host, port, user, password } = this.configService.getConfig().mail;
		return nodemailer.createTransport({
			host,
			port,
			secure: false, // Usa true para 465, falso para otros puertos
			auth: { user, pass: password },
		});
	}

	private async sendEmailWithNodemailer(options: IEmailOption) {
		const transporter = this.getTransporterNodemailer();
		const { from } = this.configService.getConfig().mail;
		const { name } = this.configService.getConfig().app;

		const mailOptions: IObjectForSendEmail = {
			from: `${name} <${from}>`,
			to: options.to,
			subject: options.subject,
		};

		if (options.type === 'html') {
			mailOptions.html = options.message;
		} else {
			mailOptions.text = options.message;
		}

		try {
			await transporter.sendMail(mailOptions);
		} catch (error) {
			console.error(error);
			console.error(`Error enviando email: ${error.message}`);
		}
	}

	private sendEmailWithAWS(options: IEmailOption) {
		// Implementa la logica para enviar el correo utilizando AWS
	}
}
