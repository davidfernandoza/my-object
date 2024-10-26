import { Module } from '@nestjs/common';
import { UsersModule } from '@users-v1/users.module';
import { CompaniesModule } from '@companies-v1/companies.module';
import { CommonModule } from '@common-v1/common.module';

@Module({
	imports: [UsersModule, CompaniesModule, CommonModule],
})
export class V1Module {}
