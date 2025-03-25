import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ItemType } from '@database/entities/item/item-type.entity';

@Injectable()
export class ItemTypeRepository extends Repository<ItemType> {
	constructor(
		@InjectRepository(ItemType)
		private readonly repository: Repository<ItemType>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
