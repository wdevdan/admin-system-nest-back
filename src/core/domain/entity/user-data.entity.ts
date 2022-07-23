import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';

import { BaseEntity } from '../models/base';
import { User } from './user.entity';

@Entity({ name: 'user-data' })
export class UserData extends BaseEntity {

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: true })
  alias?: string;

  @IsEmail() 
  @Column({ type: 'varchar', length: 256, nullable: true })
  email?: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: true })
  lastName?: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: true })
  middleName?: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: true })
  document?: string;

  @OneToOne(() => User, (user: User) => user.userData)
  user: User;

  get CreationFields(): string[] {
    return ['name', 'alias', 'email', 'lastName', 'middleName', 'document'];
  }

  get DtoFields(): string[] {
    return [...this.CreationFields, 'user'];
  }
}