import { Test, TestingModule } from '@nestjs/testing';
import { BookingServices } from '@company-v1/services/booking.services';

describe('BookingServices', () => {
	let provider: BookingServices;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BookingServices],
		}).compile();

		provider = module.get<BookingServices>(BookingServices);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});
});
