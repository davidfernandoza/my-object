import { Test, TestingModule } from '@nestjs/testing';
import { CompanyServices } from '@companies-v1/services/company.services';

describe('CompanyServices', () => {
	let provider: CompanyServices;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CompanyServices],
		}).compile();

		provider = module.get<CompanyServices>(CompanyServices);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
