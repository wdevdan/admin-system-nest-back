import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

import { Device, UserData, Token } from '.';
import { BaseEntity } from '../models/base';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @IsNotEmpty() @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: false })
  username: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: true })
  login: string;

  @Length(3, 50)
  @Column({ type: 'varchar', length: 256, nullable: false })
  password: string;


  @OneToOne(() => UserData, { cascade: true, eager: true })
  @JoinColumn({ name: 'user_data_id' })
  userData: UserData;
  
  @OneToOne(() => Device, { cascade: true, eager: true })
  @JoinColumn({ name: 'device_id' })
  device: Device;
  
  @OneToOne(() => Token, { cascade: true, eager: true })
  @JoinColumn({ name: 'token_id' })
  token: Token;

  get CreationFields(): string[] {
    return ['username', 'login', 'password'];
  }

  get DtoFields(): string[] {
    return [...this.CreationFields, 'login', 'userData', 'device', 'token'];
  }
}
