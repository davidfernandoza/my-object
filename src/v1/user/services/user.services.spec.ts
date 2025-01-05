import { Test, TestingModule } from '@nestjs/testing';
import { UserServices } from '@user-v1/services/user.services';

describe('UserServices', () => {
	let provider: UserServices;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserServices],
		}).compile();

		provider = module.get<UserServices>(UserServices);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
