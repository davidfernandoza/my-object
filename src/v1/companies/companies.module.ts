import { Module } from '@nestjs/common';

import { CompanyController } from '@companies-v1/controllers/company.controller';
import { BookingController } from '@companies-v1/controllers/booking.controller';
import { UsersModule } from '@users-v1/users.module';
import { CompanyServices } from '@companies-v1/services/company.services';
import { BookingServices } from '@companies-v1/services/booking.services';

@Module({
	imports: [UsersModule],
	controllers: [CompanyController, BookingController],
	providers: [CompanyServices, BookingServices],
})
export class CompaniesModule {}
