import { Module } from '@nestjs/common';
import { UserService } from '@src/v1/user/services/user.service';
import { UserController } from '@user-v1/controllers/user.controller';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService],
	exports: [],
})
export class UserModule {}
