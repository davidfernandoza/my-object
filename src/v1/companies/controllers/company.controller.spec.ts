import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '@companies-v1/controllers/company.controller';

describe('CompanyController', () => {
	let controller: CompanyController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CompanyController],
		}).compile();

		controller = module.get<CompanyController>(CompanyController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
