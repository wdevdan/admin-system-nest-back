import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseService } from '../../../base/base.service';
import { UserData } from '../../../../core/domain';

@Injectable()
export class UserDataService extends BaseService<UserData> {
  constructor(@InjectRepository(UserData) private readonly repo: Repository<UserData>) { super(repo)}
}
