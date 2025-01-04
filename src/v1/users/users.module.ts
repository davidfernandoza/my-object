import { Module } from '@nestjs/common';
import { UserServices } from '@users-v1/services/user.services';
import { UserController } from '@users-v1/controllers/user.controller';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserServices],
	exports: [],
})
export class UsersModule {}
