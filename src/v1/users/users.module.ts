import { Module } from '@nestjs/common';
import { UserServices } from '@users-v1/services/user.services';
import { AuthServices } from '@users-v1/services/auth.services';
import { UserController } from '@users-v1/controllers/user.controller';
import { AuthController } from '@users-v1/controllers/auth.controller';
import { MessagesServices } from '@common-v1/services/messages.services';
import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';

@Module({
	imports: [MessagesServices],
	controllers: [UserController, AuthController],
	providers: [AuthServices, UserServices, ApiKeyGuard],
	exports: [ApiKeyGuard],
})
export class UsersModule {}
