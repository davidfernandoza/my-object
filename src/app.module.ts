import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import 'dotenv/config';

import { V1Module } from './v1/v1.module';
import { V2Module } from './v2/v2.module';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@database/database.module';
import { appConfig } from '@config/app.config';
import { appConfigSchema } from '@config/schema.config';
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
		DatabaseModule,
		AuthModule,
		CommonModule,
		V1Module,
		V2Module,
	],
	// providers: [IsUniqueConstraint],
	providers: [],
	exports: [],
})
export class AppModule {}
