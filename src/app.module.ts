import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import 'dotenv/config';

import { V1Module } from '@src/v1/v1.module';
import { ConfigModule } from '@config/config.module';
import { appConfig, appConfigSchema } from '@config/app.config';

/*
 * Los modulos globales deben pasar por aquí, ya que depende del orden de
 * ejecucion para que esten disponibles para los otros modulos
 */
@Module({
	imports: [
		Config.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [appConfig],
			validationSchema: appConfigSchema,
		}),
		ConfigModule,
		V1Module,
	],
	providers: [],
	exports: [],
})
export class AppModule {}
