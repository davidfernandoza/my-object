import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IdentificationType } from '@database/entities/user/identification-type.entity';

@Injectable()
export class IdentificationTypeRepository extends Repository<IdentificationType> {
	constructor(
		@InjectRepository(IdentificationType)
		private readonly repository: Repository<IdentificationType>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
