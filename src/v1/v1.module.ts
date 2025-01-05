import { Module } from '@nestjs/common';

import { UserModule } from '@user-v1/user.module';
import { CompanyModule } from '@src/v1/company/company.module';
import { ItemModule } from '@src/v1/item/item.module';

@Module({
	imports: [UserModule, CompanyModule, ItemModule],
})
export class V1Module {}
