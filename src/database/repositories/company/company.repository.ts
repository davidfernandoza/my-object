import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from '@database/entities/company/company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
	constructor(
		@InjectRepository(Company)
		private readonly repository: Repository<Company>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
