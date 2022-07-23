import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';
import { Item } from '../../../core/domain';

@Injectable()
export class ItemService extends BaseService<Item> {
  constructor(@InjectRepository(Item) private readonly repo: Repository<Item>) { super(repo)}
}

