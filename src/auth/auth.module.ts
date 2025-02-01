import { Module, Global } from '@nestjs/common';

import { AuthServices } from '@src/auth/services/auth.services';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { MessagesService } from '@src/common/services/messages.service';
import { ApiKeyGuard } from '@auth/guards/api-key.guard';

@Global()
@Module({
	imports: [MessagesService],
	controllers: [AuthController],
	providers: [AuthServices, ApiKeyGuard],
	exports: [ApiKeyGuard],
})
export class AuthModule {}
