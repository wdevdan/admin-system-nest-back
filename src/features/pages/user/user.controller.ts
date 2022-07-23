import { Controller, UseGuards } from '@nestjs/common';

import { BaseController } from '../../base/base.controller';
import { RolesGuard } from '../../../core/security';
import { UserService } from './user.service';
import { User } from '../../../core/domain';

@Controller('User')
// @UseGuards(RolesGuard)
export class UserController extends BaseController<User> {
	constructor(private readonly serv: UserService) {
		super(serv, new User())
	}
}
