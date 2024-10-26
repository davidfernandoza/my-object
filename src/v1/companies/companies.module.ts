import { Module } from '@nestjs/common';
import { CompanyController } from '@companies-v1/controllers/company.controller';
import { BookingController } from '@companies-v1/controllers/booking.controller';
import { UsersModule } from '@users-v1/users.module';
import { ItemController } from '@companies-v1/controllers/item.controller';
import { ItemServices } from '@companies-v1/services/item.services';
import { CompanyServices } from '@companies-v1/services/company.services';
import { BookingServices } from '@companies-v1/services/booking.services';

@Module({
	imports: [UsersModule],
	controllers: [CompanyController, ItemController, BookingController],
	providers: [ItemServices, CompanyServices, BookingServices],
})
export class CompaniesModule {}
