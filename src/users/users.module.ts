import { Module } from '@nestjs/common';
import { UserServices } from './services/user/user.services';
import { AuthServices } from './services/auth/auth.services';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';


@Module({
  controllers: [UserController, AuthController],
  providers: [AuthServices, UserServices]
})
export class UsersModule {}
