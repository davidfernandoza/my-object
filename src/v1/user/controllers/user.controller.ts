import { Controller, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '@auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller({ path: 'users', version: '1' })
export class UserController {}
