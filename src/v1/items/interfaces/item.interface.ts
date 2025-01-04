import { Item } from '@src/v1/items/entities/item.entity';
import { CreateItemDTO, UpdateItemDTO } from '@src/v1/items/dtos/item.dto';

export interface ItemInterface {
	get(id: number): Promise<Item>;
	getAll(): Promise<Item[]>;
	create(payload: CreateItemDTO): Promise<Item>;
	delete(id: number): void;
	update(id: number, payload: UpdateItemDTO): void;
}
