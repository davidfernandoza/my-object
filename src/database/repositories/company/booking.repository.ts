import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Booking } from '@database/entities/company/booking.entity';

@Injectable()
export class BookingRepository extends Repository<Booking> {
	constructor(
		@InjectRepository(Booking)
		private readonly repository: Repository<Booking>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
