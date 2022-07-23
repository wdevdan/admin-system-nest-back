import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { IHttpError, IHttpResponse } from '../../../core/infra';
import { badRequest, ok } from '../../../features/presentation';
import { BaseService } from '../../base/base.service';
import { User } from '../../../core/domain';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { super(userRepo) }

  getByLogin(login: string): Promise<IHttpError | IHttpResponse<User>> {
    return new Promise(async (resolve, reject) => {
      let error: IHttpError, success = true;

      const result = await new Promise<IHttpError | any>((res, rej) => 
      this.userRepo.findOne({ where: login }).then(response => res(response)).
      catch(err => { success = false; error = err; rej(err) }));

      if (!success) {
        result.body = error;
        reject(badRequest(result));
      }

      resolve(ok<User>(result));
    });
  }
  
  create(user: User): Promise<IHttpError | IHttpResponse<any>> {
    return new Promise(async (resolve, reject) => {
      let error: IHttpError, success = true;
      let { uid, password } = user;

      if (!uid) user.uid = uuid();      

      if (password) user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

      const result = await new Promise<IHttpError | any>((res, rej) => {
        this.userRepo.save(user).then(
        (response) => res(response))
        .catch((err) => {
          success = false;
          error = err;
          rej(err);
        });
      });

      if (!success) {
        result.body = error;
        reject(badRequest(result));
      }

      resolve(ok<any>(result));
    });
  }
}
