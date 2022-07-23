import { Module } from '@nestjs/common';

import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  imports: [ItemModule],
  providers: [ItemService],
  controllers: [ItemController]
})
export class ItemModule {}
