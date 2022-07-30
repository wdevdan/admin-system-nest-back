import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { validate as ModelValidator, ValidationError } from 'class-validator';
import { DeleteResult, UpdateResult } from 'typeorm';

import { BaseDto, BaseEntity, BaseShortEntity, BaseExpireEntity } from '../../core/domain';
import { SessionGuard } from '../../core/security/guards/session.guard';
import { IBaseService } from '../../core/infra/contracts';

@Controller()
export abstract class BaseController<T extends BaseEntity | BaseShortEntity | BaseExpireEntity> {
  constructor(protected readonly IBaseService: IBaseService<T>, protected readonly model: T) {}

  @Get()
  @UseGuards(SessionGuard)
  async findAll(): Promise<T[] | any> {
    return this.handlerWithData(this.IBaseService.getAll());
  }

  @Get('/limit/:id')
  @UseGuards(SessionGuard)
  async findAllLimited(@Param('id') id: number): Promise<T[] | any> {
    return this.handlerWithData(this.IBaseService.getAllLimited(id));
  }

  @Get('/uid/:uid')
  @UseGuards(SessionGuard)
  async findByUid(@Param('uid') uid: string): Promise<T[] | any> {
    return this.handlerWithData(this.IBaseService.getByUid(uid));
  }

  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() entity: T): Promise<any> {
    const errors = await this.validateData(entity);
    if (errors && errors.length) return errors;

    const dto = BaseDto.transformDto(entity, this.model.DtoFields);
    return this.handlerWithData(this.IBaseService.create(dto as T));
  }

  @Put()
  @UseGuards(SessionGuard)
  async update(@Body() entity: T | any): Promise<UpdateResult | Error> {
    const errors = await this.validateData(entity, true);
    if (errors && errors.length) return errors;

    const dto = BaseDto.transformDto(entity, this.model.DtoFields);
    return this.handlerSimple(this.IBaseService.update(dto as T));
  }

  @Delete(':uid')
  @UseGuards(SessionGuard)
  async delete(@Param('uid') uid: string): Promise<DeleteResult | Error> {
    return this.handlerSimple(this.IBaseService.delete(uid));
  }

  @Put(':uid')
  @UseGuards(SessionGuard)
  async restore(@Param('uid') uid: string): Promise<UpdateResult | Error> {
    return this.handlerSimple(this.IBaseService.restore(uid));
  }

  protected async handlerWithData(action: Promise<any>): Promise<any> {
    return new Promise<T | Error>(async (resolver, reject) => {
      action.then((response) => {
        if (response.body) {
          response.body = BaseDto.transformDto(response.body,this.model.DtoFields);

          resolver(response);
        } else reject(new BadRequestException('Not found'));
      }).catch((err) => reject(new BadRequestException(err)));
    });
  }

  protected async handlerSimple(action: Promise<any>): Promise<any> {
    return new Promise<any>(async (resolver, reject) => {
      action.then((response) => {
        if (response.body) {
          let { affected } = response.body;
          response = affected ?? response.body;

          resolver(response);
        }
      }).catch((err) => reject(new BadRequestException(err)));
    });
  }

  protected async validateData(entity: any, update?: boolean): Promise<any[] | any> {
    return new Promise<T | Error>(async (resolver, reject) => {
      let fields = update ? this.model.DtoFields : this.model.CreationFields;
      let response = [] as any;

      if (fields && fields.length > 0)
      fields.forEach((f: string) => this.model[f] = entity[f]);
      else resolver(response);

      const errors = await ModelValidator(this.model);

      if (errors && errors.length) {
        errors.map((e: ValidationError) =>
          response.push(Object.assign(e.constraints)),
        );
        reject(new BadRequestException(response));
      } else resolver(response);
    });
  }
}
