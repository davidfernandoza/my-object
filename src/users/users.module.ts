import { Module } from '@nestjs/common';
import { UserServices } from './services/user.services';
import { AuthServices } from './services/auth.services';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { MessagesServices } from 'src/common/services/messages.services';

@Module({
	imports: [MessagesServices],
	controllers: [UserController, AuthController],
	providers: [AuthServices, UserServices],
})
export class UsersModule {}
