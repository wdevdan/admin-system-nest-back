import { IsNotEmpty, Length } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';

import { BaseExpireEntity } from '../models/base';
import { User } from './user.entity';

@Entity({ name: 'device' })
export class Device extends BaseExpireEntity {

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: false })
  device: string;


  @OneToOne(() => User, (user: User) => user.userData)
  user: User;

  get CreationFields(): string[] {
    return ['device'];
  }

  get DtoFields(): string[] {
    return [...this.CreationFields, 'user'];
  }
}
