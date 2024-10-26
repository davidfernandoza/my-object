import { Controller, Get, UseGuards, Param, ParseIntPipe, SetMetadata } from '@nestjs/common';
import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';
import { ItemServices } from '@companies-v1/services/item.services';
import { ItemInterface } from '@companies-v1/interfaces/item.interface';

@UseGuards(ApiKeyGuard)
@Controller('v1/item')
export class ItemController {
	private itemServices: ItemInterface;
	constructor() {
		this.setService(new ItemServices());
	}

	setService(service: ItemInterface) {
		this.itemServices = service;
	}
	@Get(':itemId')
	@SetMetadata('isPublic', true)
	async getById(@Param('itemId', ParseIntPipe) itemId: number) {
		return await this.itemServices.get(itemId);
	}
}