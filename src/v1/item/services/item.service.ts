import { Injectable } from '@nestjs/common';

// import { ItemInterface } from '@item-v1/interfaces/item.interface';
// import { Item } from '@database/entities/item/item.entity';
// import { CreateItemDTO, UpdateItemDTO } from '@item-v1/dtos/item.dto';

@Injectable()
// export class ItemServices implements ItemInterface {
export class ItemServices {
	// get(id: number): Promise<Item> {
	// 	return new Promise(resolve => {
	// 		const item = new Item();
	// 		item.name = 'admin';
	// 		resolve(item);
	// 	});
	// }
	// getAll(): Promise<Item[]> {
	// 	return new Promise(resolve => {
	// 		resolve([]);
	// 	});
	// }
	// create(payload: CreateItemDTO): Promise<Item> {
	// 	return new Promise(resolve => {
	// 		if (payload.name === 'admin') {
	// 			console.log('error');
	// 		}
	// 		const item = new Item();
	// 		item.name = payload.name;
	// 		item.companie_id = payload.companie_id;
	// 		resolve(item);
	// 	});
	// }
	// update(id: number, payload: UpdateItemDTO): void {
	// 	new Promise(resolve => {
	// 		resolve({ payload, id });
	// 	});
	// }
	// delete(id: number): void {
	// 	new Promise(resolve => {
	// 		resolve(id);
	// 	});
	// }
}
