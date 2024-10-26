import { Controller, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('v1/user')
export class UserController {}
