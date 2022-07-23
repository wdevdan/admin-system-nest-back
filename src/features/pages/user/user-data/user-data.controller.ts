import { Controller, UseGuards } from '@nestjs/common';

import { BaseController } from '../../../base/base.controller';
import { RolesGuard } from '../../../../core/security';
import { UserDataService } from './user-data.service';
import { UserData } from '../../../../core/domain';

@Controller('UserData')
// @UseGuards(RolesGuard)
export class UserDataController extends BaseController<UserData> {
	constructor(private readonly serv: UserDataService) {
		super(serv, new UserData())
	}	
}