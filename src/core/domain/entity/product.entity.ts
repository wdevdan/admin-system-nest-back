import { IsNotEmpty, Length } from 'class-validator';
import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../models/base/base-entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256 })
  description: string;

  get CreationFields(): string[] {
    return ['name', 'description'];
  }

  get DtoFields(): string[] {
    return [...this.CreationFields];
  }
}