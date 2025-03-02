import { Module } from '@nestjs/common';

import { UserModule } from '@user-v1/user.module';
import { CompanyModule } from '@company-v1/company.module';
import { ItemModule } from '@item-v1/item.module';

@Module({
	imports: [UserModule, CompanyModule, ItemModule],
})
export class V1Module {}
