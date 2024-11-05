import { Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { ApiKeyGuard } from '@users-v1/guards/api-key.guard';
import { ItemServices } from '@companies-v1/services/item.services';
import { ItemInterface } from '@companies-v1/interfaces/item.interface';
import { isPublic } from '@common-v1/decorators/is-public.decorator';

@UseGuards(ApiKeyGuard)
@Controller('v1/item')
export class ItemController {
	private itemServices: ItemInterface;

	constructor(private readonly itemServicesSingleton: ItemServices) {
		this.setService(this.itemServicesSingleton);
	}

	setService(service: ItemInterface) {
		this.itemServices = service;
	}

	@Get(':itemId')
	@isPublic() // decorador creado
	async getById(@Param('itemId', ParseIntPipe) itemId: number) {
		return await this.itemServices.get(itemId);
	}
}
