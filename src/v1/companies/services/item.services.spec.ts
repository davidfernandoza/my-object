import { Test, TestingModule } from '@nestjs/testing';
import { ItemServices } from '@companies-v1/services/item.services';

describe('ItemServices', () => {
	let provider: ItemServices;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ItemServices],
		}).compile();

		provider = module.get<ItemServices>(ItemServices);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
