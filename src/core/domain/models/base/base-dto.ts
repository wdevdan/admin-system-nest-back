import { NotAcceptableException } from '@nestjs/common';

import { BaseEntity } from './base-entity';

export class BaseDto extends BaseEntity implements Readonly<BaseDto> {
  get CreationFields(){ return null }
  get DtoFields(){ return null }

  public static transformDto(dto: Partial<any> | any, fields: string[]) {   
    const isArray = dto && dto.length > 0;
    const isObject = dto && !dto.length;
    
    if (isArray && !isObject)
    return this.entitiesToDtos(dto, fields);
    
    if (isObject && !isArray)
    return this.entityToDto(dto, fields);

    if (!isArray && !isObject || isArray && isObject)
    throw new NotAcceptableException();
  }

  private static entityToDto(dto: Partial<any> | any, fields: string[]) {
    let it = new BaseDto();

    it.uid = dto.uid;
    
    for (let field of fields) {
      it[field] = dto[field];
    }

    if (!dto['deletedAt'])
    delete it['deletedAt'];

    return it;
  }

  private static entitiesToDtos(dto: Partial<any[]> | any[], fields: string[]) {    
    let dtos = [];

    for (let item of dto) {
      dtos.push(this.transformDto(item, fields));
    }
    
    return dtos;
  }
}
