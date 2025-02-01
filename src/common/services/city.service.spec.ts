import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';

describe('CityService', () => {
	let provider: CityService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CityService],
		}).compile();

		provider = module.get<CityService>(CityService);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
