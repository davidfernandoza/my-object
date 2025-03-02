import { Module } from '@nestjs/common';

import { CompanyController } from '@company-v1/controllers/company.controller';
import { BookingController } from '@company-v1/controllers/booking.controller';
import { UserModule } from '@user-v1/user.module';
import { CompanyServices } from '@company-v1/services/company.services';
import { BookingServices } from '@company-v1/services/booking.services';

@Module({
	imports: [UserModule],
	controllers: [CompanyController, BookingController],
	providers: [CompanyServices, BookingServices],
})
export class CompanyModule {}
