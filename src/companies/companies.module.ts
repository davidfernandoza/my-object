import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company/company.controller';
import { ItemController } from './controllers/item/item.controller';
import { BookingController } from './controllers/booking/booking.controller';
import { CompanyService } from './services/company/company.service';
import { ItemService } from './services/item/item.service';
import { BookingServices } from './services/booking/booking.services';



@Module({
  controllers: [CompanyController, ItemController, BookingController],
  providers: [CompanyService, ItemService, BookingServices]
})
export class CompaniesModule {}
