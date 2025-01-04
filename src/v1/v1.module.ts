import { Module } from '@nestjs/common';
import { UsersModule } from '@users-v1/users.module';
import { CompaniesModule } from '@companies-v1/companies.module';
import { ItemsModule } from './items/items.module';

@Module({
	imports: [UsersModule, CompaniesModule, ItemsModule],
})
export class V1Module {}
