import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@config/app.config';
import { User } from '@database/entities/user/user.entity';
import { IdentificationType } from '@database/entities/user/identification-type.entity';
import { City } from '@database/entities/common/city.entity';
import { Office } from '@database/entities/company/office.entity';
import { Company } from '@database/entities/company/company.entity';
import { Employeer } from '@database/entities/company/employeer.entity';
import { Item } from '@database/entities/item/item.entity';
import { ItemType } from '@database/entities/item/item-type.entity';
import { History } from '@database/entities/item/history.entity';
import { Booking } from '@database/entities/company/booking.entity';
import { Auth } from '@database/entities/auth/auth.entity';
import { JWTBlacklist } from '@database/entities/auth/auth-token.entity';
import { Department } from '@database/entities/common/department.entity';
import { UserRepository } from '@database/repositories/user/user.repository';
import { AuthRepository } from '@database/repositories/auth/auth.repository';
import { JWTBlacklistRepository } from '@database/repositories/auth/auth-token.repository';

const entities = [
	User,
	IdentificationType,
	City,
	Office,
	Company,
	Employeer,
	Item,
	ItemType,
	History,
	Booking,
	Auth,
	JWTBlacklist,
	Department,
];

/**
 * DatabaseModule: módulo global para la configuración de la base de datos.
 */
@Global()
@Module({
	imports: [
		// Configuración asincrónica de TypeORM
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
					timezone: '-05:00',
					entities,
				};
			},
			inject: [ConfigService],
		}),

		// Registra las entidades para los repositorios
		TypeOrmModule.forFeature(entities),
	],
	providers: [UserRepository, AuthRepository, JWTBlacklistRepository],
	exports: [TypeOrmModule, UserRepository, AuthRepository, JWTBlacklistRepository],
})
export class DatabaseModule {}
