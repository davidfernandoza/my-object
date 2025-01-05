import { Module } from '@nestjs/common';

import { CompanyController } from '@src/v1/company/controllers/company.controller';
import { BookingController } from '@src/v1/company/controllers/booking.controller';
import { UserModule } from '@user-v1/user.module';
import { CompanyServices } from '@src/v1/company/services/company.services';
import { BookingServices } from '@src/v1/company/services/booking.services';

@Module({
	imports: [UserModule],
	controllers: [CompanyController, BookingController],
	providers: [CompanyServices, BookingServices],
})
export class CompanyModule {}
