import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@src/app.module';
import { ConfigService } from '@config/app.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	/*
	 * Cargar la configuracion de la aplicacion
	 */
	const configService = app.get(ConfigService);
	const config = configService.getConfig();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // ignora los atributos que no existen en el dto
			forbidNonWhitelisted: true, // retorna un error con los atributos no permitidos
		}),
	);
	await app.listen(config.app.port);
}
bootstrap();
