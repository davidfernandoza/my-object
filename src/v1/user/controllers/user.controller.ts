import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { IUserService } from '@user-v1/interfaces/user-service.interface';
import { UserService } from '@user-v1/services/user.service';

// @UseGuards(ApiKeyGuard)
@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
	private userService: IUserService;

	constructor(private readonly userServiceSingleton: UserService) {
		this.setAuthServices(this.userServiceSingleton);
	}

	setAuthServices(userService: IUserService) {
		this.userService = userService;
	}

	@Get('get-all')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Get all users',
		description: 'Get all users in array object',
	})
	async getAll() {
		return await this.userService.getAll();
	}
}
