import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Office } from '@database/entities/company/office.entity';

@Injectable()
export class OfficeRepository extends Repository<Office> {
	constructor(
		@InjectRepository(Office)
		private readonly repository: Repository<Office>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
