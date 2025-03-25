import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { City } from '@database/entities/common/city.entity';

@Injectable()
export class CityRepository extends Repository<City> {
	constructor(
		@InjectRepository(City)
		private readonly repository: Repository<City>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
