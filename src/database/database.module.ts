import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@config/app.config';
import { User } from '@src/database/entities/user/user.entity';
import { IdentificationType } from '@src/database/entities/user/identification-type.entity';
import { City } from '@src/database/entities/common/city.entity';
import { Office } from '@src/database/entities/company/office.entity';
import { Company } from '@src/database/entities/company/company.entity';
import { Employeer } from '@src/database/entities/company/employeer.entity';
import { Item } from '@src/database/entities/item/item.entity';
import { ItemType } from '@src/database/entities/item/item-type.entity';
import { History } from '@src/database/entities/item/history.entity';
import { Booking } from '@src/database/entities/company/booking.entity';
import { Auth } from '@src/database/entities/auth/auth.entity';
import { Department } from '@src/database/entities/common/department.entity';

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
		TypeOrmModule.forFeature([
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
			Department,
		]),
	],
	providers: [],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
