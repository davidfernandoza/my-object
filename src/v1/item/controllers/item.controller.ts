import {
	Controller,
	Get,
	UseGuards,
	Param,
	ParseIntPipe,
	Post,
	Body,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiKeyGuard } from '@auth/guards/api-key.guard';
import { ItemServices } from '@src/v1/item/services/item.services';
import { ItemInterface } from '@src/v1/item/interfaces/item.interface';
import { isPublic } from '@common/decorators/is-public.decorator';
import { CreateItemDTO } from '@src/v1/item/dtos/item.dto';

@ApiTags('Item')
@UseGuards(ApiKeyGuard)
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
