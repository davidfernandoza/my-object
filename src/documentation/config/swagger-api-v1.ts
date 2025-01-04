import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

export const configV1 = new DocumentBuilder()
	.setTitle('My Object API')
	.setDescription('The My Object API in its first version show a MVP stable.')
	.setVersion('1.0')
	.addServer(process.env.DOC_URL_DEVELOPMENT, 'Development')
	.addServer(process.env.DOC_URL_TESTING, 'Testing')
	.addServer(process.env.DOC_URL_PRODUCTION, 'Production')
	.addTag('Auth')
	.addTag('Item')
	.build();
