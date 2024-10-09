import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, CompaniesModule, CommonModule],
})
export class AppModule {}
