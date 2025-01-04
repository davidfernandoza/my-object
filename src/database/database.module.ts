import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@config/app.config';

/*
 * Conexion para los modelos (entidades)
 */
@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				const type = configService.getConfig().database.type as
					| 'mysql'
					| 'postgres'
					| 'mariadb'
					| 'sqlite'
					| 'mssql';
				return {
					type: type,
					host: configService.getConfig().database.host,
					port: configService.getConfig().database.port,
					username: configService.getConfig().database.username,
					password: configService.getConfig().database.password,
					database: configService.getConfig().database.database,
					synchronize: false,
					logging: false,
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
