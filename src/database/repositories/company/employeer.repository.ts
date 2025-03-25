import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Employeer } from '@database/entities/company/employeer.entity';

@Injectable()
export class EmployeerRepository extends Repository<Employeer> {
	constructor(
		@InjectRepository(Employeer)
		private readonly repository: Repository<Employeer>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
