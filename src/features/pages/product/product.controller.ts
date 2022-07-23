import { Controller, UseGuards } from '@nestjs/common';

import { BaseController } from '../../base/base.controller';
import { RolesGuard } from '../../../core/security';
import { ProductService } from './product.service';
import { Product } from '../../../core/domain';

@Controller('Product')
// @UseGuards(RolesGuard)
export class ProductController extends BaseController<Product> {
	constructor(private readonly serv: ProductService) {
		super(serv, new Product())
	}	
}
