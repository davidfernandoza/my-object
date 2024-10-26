import { Item } from '@companies-v1/entities/item.entity';
import { CreateItemDto, UpdateItemDto } from '@companies-v1/dtos/item.dto';

export interface ItemInterface {
	get(id: number): Promise<Item>;
	getAll(): Promise<Item[]>;
	create(payload: CreateItemDto): Promise<Item>;
	delete(id: number): void;
	update(id: number, payload: UpdateItemDto): void;
}
