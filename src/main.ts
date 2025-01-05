import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@src/app.module';
import { AuthModule } from '@auth/auth.module';
import { CompanyModule as CompanyModuleV1 } from '@company-v1/company.module';
import { UserModule as UserModuleV1 } from '@user-v1/user.module';
import { ItemModule as ItemModuleV1 } from '@item-v1/item.module';
import { CommonModule } from '@common/common.module';
import { ConfigService } from '@config/app.config';
import { configV1 } from '@documentation/config/swagger-api-v1';
import { configV2 } from '@documentation/config/swagger-api-v2';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableVersioning({ type: VersioningType.URI });
	app.setGlobalPrefix('api', { exclude: ['docs/v1', 'docs/v2'] });

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

	/*
	 * Swagger documentation
	 */
	const documentV1 = SwaggerModule.createDocument(app, configV1, {
		include: [AuthModule, CommonModule, UserModuleV1, CompanyModuleV1, ItemModuleV1],
	});
	documentV1.paths = removePrefixApi(documentV1);
	SwaggerModule.setup('docs/v1', app, documentV1);

	const documentV2 = SwaggerModule.createDocument(app, configV2, {
		include: [AuthModule, CommonModule],
	});
	documentV2.paths = removePrefixApi(documentV2);
	SwaggerModule.setup('docs/v2', app, documentV2);

	await app.listen(config.app.port);
}

function removePrefixApi(document: any) {
	return Object.fromEntries(
		Object.entries(document.paths).map(([path, pathItem]) => {
			const transformedPath = path.replace(/^\/api/, '');
			return [transformedPath, pathItem];
		}),
	);
}
bootstrap();
