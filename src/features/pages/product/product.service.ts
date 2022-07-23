import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';
import { Product } from '../../../core/domain';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) { super(repo)}
}
