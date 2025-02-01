import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
	let provider: DepartmentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DepartmentService],
		}).compile();

		provider = module.get<DepartmentService>(DepartmentService);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
