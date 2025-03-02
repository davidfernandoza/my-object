import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Body,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ItemServices } from '@item-v1/services/item.services';
import { ItemInterface } from '@item-v1/interfaces/item.interface';
import { isPublic } from '@common/decorators/is-public.decorator';
import { CreateItemDTO } from '@item-v1/dtos/item.dto';

@ApiTags('Item')
@Controller({ path: 'item', version: '1' })
export class ItemController {
	private itemServices: ItemInterface;

	constructor(private readonly itemServicesSingleton: ItemServices) {
		// this.setService(this.itemServicesSingleton);
	}
	setService(service: ItemInterface) {
		this.itemServices = service;
	}

	@Get(':itemId')
	@isPublic() // decorador creado
	@ApiOperation({ summary: 'Get item by id' })
	async getById(@Param('itemId', ParseIntPipe) itemId: number) {
		return await this.itemServices.get(itemId);
	}

	@Post()
	@HttpCode(HttpStatus.ACCEPTED)
	@ApiOperation({ summary: 'Create item', description: 'Create item' })
	async create(@Body() payload: CreateItemDTO) {
		return await this.itemServices.create(payload);
	}
}
