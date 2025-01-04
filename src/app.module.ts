import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import 'dotenv/config';

import { V1Module } from '@src/v1/v1.module';
import { V2Module } from '@src/v2/v2.module';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@database/database.module';
import { appConfig, appConfigSchema } from '@config/app.config';
import { AuthModule } from '@auth/auth.module';
import { CommonModule } from '@common/common.module';

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
		AuthModule,
		CommonModule,
		DatabaseModule,
		V1Module,
		V2Module,
	],
	providers: [],
	exports: [],
})
export class AppModule {}
