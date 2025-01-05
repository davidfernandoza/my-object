import { Module } from '@nestjs/common';
import { UserServices } from '@user-v1/services/user.services';
import { UserController } from '@user-v1/controllers/user.controller';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserServices],
	exports: [],
})
export class UserModule {}
