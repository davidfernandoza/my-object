import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthServices } from '@auth/services/auth.services';
import { JwtServices } from '@auth/services/jwt.services';
import { AuthController } from '@auth/controllers/auth.controller';
import { MessagesService } from '@common/services/messages.service';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';

@Global()
@Module({
	imports: [PassportModule, MessagesService, JwtModule],
	controllers: [AuthController],
	providers: [AuthServices, JwtServices, JwtStrategy],
	exports: [JwtStrategy],
})
export class AuthModule {}
