import { Injectable } from '@nestjs/common';
import { ItemInterface } from '@companies-v1/interfaces/item.interface';
import { Item } from '@companies-v1/entities/item.entity';
import { CreateItemDto, UpdateItemDto } from '@companies-v1/dtos/item.dto';

@Injectable()
export class ItemServices implements ItemInterface {
	get(id: number): Promise<Item> {
		return new Promise(resolve => {
			const item = new Item();
			item.name = 'admin';
			item.companie_id = id;
			resolve(item);
		});
	}
	getAll(): Promise<Item[]> {
		return new Promise(resolve => {
			resolve([]);
		});
	}
	create(payload: CreateItemDto): Promise<Item> {
		return new Promise(resolve => {
			if (payload.name === 'admin') {
				console.log('error');
			}
			const item = new Item();
			item.name = payload.name;
			item.companie_id = payload.companie_id;
			resolve(item);
		});
	}
	update(id: number, payload: UpdateItemDto): void {
		new Promise(resolve => {
			resolve({ payload, id });
		});
	}
	delete(id: number): void {
		new Promise(resolve => {
			resolve(id);
		});
	}
}
