import { Module } from '@nestjs/common';

import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';

@Module({
  imports: [],
  providers: [UserDataService],
  controllers: [UserDataController]
})
export class UserDataHttpModule {}
