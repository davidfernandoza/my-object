import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { History } from '@database/entities/item/history.entity';

@Injectable()
export class HistoryRepository extends Repository<History> {
	constructor(
		@InjectRepository(History)
		private readonly repository: Repository<History>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
