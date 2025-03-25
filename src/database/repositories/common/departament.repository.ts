import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Department } from '@database/entities/common/department.entity';

@Injectable()
export class DepartmentRepository extends Repository<Department> {
	constructor(
		@InjectRepository(Department)
		private readonly repository: Repository<Department>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
