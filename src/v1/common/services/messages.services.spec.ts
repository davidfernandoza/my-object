import { Test, TestingModule } from '@nestjs/testing';
import { MessagesServices } from '@common-v1/services/messages.services';

describe('MessagesServices', () => {
	let provider: MessagesServices;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MessagesServices],
		}).compile();

		provider = module.get<MessagesServices>(MessagesServices);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
