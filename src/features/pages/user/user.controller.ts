import { Body, Controller, Put, UseGuards } from '@nestjs/common';

import { SessionGuard } from '../../../core/security/guards/session.guard';
import { BaseController } from '../../base/base.controller';
import { BaseDto, User } from '../../../core/domain';
import { RolesGuard } from '../../../core/security';
import { UserService } from './user.service';

@Controller('User')
// @UseGuards(RolesGuard)
export class UserController extends BaseController<User> {
	constructor(private readonly serv: UserService) {
		super(serv, new User())
	}

  @Put()
  @UseGuards(SessionGuard)
  async update(@Body() entity: User): Promise<any> {
    const errors = await this.validateData(entity, true);

    if (errors && errors.length) return errors;

    const dto = BaseDto.transformDto(entity, this.model.DtoFields);
    return this.handlerWithData(this.IBaseService.update(dto as User));
  }
}
