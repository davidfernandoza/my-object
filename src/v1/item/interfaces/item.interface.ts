import { Item } from '@database/entities/item/item.entity';
import { CreateItemDTO, UpdateItemDTO } from '@item-v1/dtos/item.dto';

export interface ItemInterface {
	get(id: number): Promise<Item>;
	getAll(): Promise<Item[]>;
	create(payload: CreateItemDTO): Promise<Item>;
	delete(id: number): void;
	update(id: number, payload: UpdateItemDTO): void;
}
