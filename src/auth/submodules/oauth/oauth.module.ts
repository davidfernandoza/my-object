import { Module } from '@nestjs/common';

import { OauthController } from '@auth/submodules/oauth/controllers/oauth.controller';
import { OauthService } from '@auth/submodules/oauth/services/oauth.service';

@Module({
	controllers: [OauthController],
	providers: [OauthService],
})
export class OauthModule {}
