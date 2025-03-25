import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from '@database/entities/item/item.entity';

@Injectable()
export class ItemRepository extends Repository<Item> {
	constructor(
		@InjectRepository(Item)
		private readonly repository: Repository<Item>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}
}
