import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // ignora los atributos que no existen en el dto
			forbidNonWhitelisted: true, // retorna un error con los atributos no permitidos
		}),
	);
	await app.listen(3000);
}
bootstrap();
