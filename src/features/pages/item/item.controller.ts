import { Controller, UseGuards } from '@nestjs/common';

import { BaseController } from '../../base/base.controller';
import { RolesGuard } from '../../../core/security';
import { ItemService } from './item.service';
import { Item } from '../../../core/domain';

@Controller('Item')
// @UseGuards(RolesGuard)
export class ItemController extends BaseController<Item> {
	constructor(private readonly serv: ItemService) {
		super(serv, new Item())
	}
}
