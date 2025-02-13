import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthServices } from '@src/auth/services/auth.services';
import { JwtServices } from '@auth/services/jwt.services';
import { AuthController } from '@src/auth/controllers/auth.controller';
import { MessagesService } from '@src/common/services/messages.service';
import { ApiKeyGuard } from '@auth/guards/api-key.guard';

@Global()
@Module({
	imports: [PassportModule, MessagesService, JwtModule],
	controllers: [AuthController],
	providers: [AuthServices, ApiKeyGuard, JwtServices],
	exports: [ApiKeyGuard],
})
export class AuthModule {}
