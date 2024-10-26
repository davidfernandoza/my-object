import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';
import { Reflector } from '@nestjs/core';

describe('ApiKeyGuard', () => {
	it('should be defined', () => {
		expect(new ApiKeyGuard(new Reflector())).toBeDefined();
	});
});
