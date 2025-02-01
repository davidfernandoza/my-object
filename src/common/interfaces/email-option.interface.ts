type TypeMessageEmail = 'text' | 'html';
type TypeEngineEmail = 'aws' | 'nodemailer';

export interface IEmailOption {
	to: string[];
	subject: string;
	message: string;
	type: TypeMessageEmail;
	engine?: TypeEngineEmail;
	from?: string;
}
export interface IObjectForSendEmail {
	to: string[];
	subject: string;
	from: string;
	html?: string;
	text?: string;
}
