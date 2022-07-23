import { IsNotEmpty, Length } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';

import { BaseExpireEntity } from '../models/base';
import { User } from './user.entity';

@Entity({ name: 'token' })
export class Token extends BaseExpireEntity {

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: false })
  token: string;


  @OneToOne(() => User, (user: User) => user.userData)
  user: User;

  get CreationFields(): string[] {
    return ['token'];
  }

  get DtoFields(): string[] {
    return [...this.CreationFields, 'user'];
  }
}
