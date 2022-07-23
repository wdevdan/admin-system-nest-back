import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { IBaseService, IHttpError, IHttpResponse } from '../../core/infra/contracts';
import { badRequest, ok } from '../presentation';

export class BaseService<T> implements IBaseService<T> {
  private readonly defaultError = new Error('Failed');

  constructor(private readonly genericRepository: Repository<T>) {}

  create(entity: any): Promise<IHttpError | IHttpResponse<T | string>> {
    return new Promise(async (resolve, reject) => {
      try {
        this.genericRepository.save(entity)
        .then(created => resolve(ok<T>(created)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  getAll(): Promise<IHttpError | IHttpResponse<T[]>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.find({ withDeleted: false })
        .then(result => resolve(ok<T[]>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  getAllLimited(limit: number): Promise<IHttpError | IHttpResponse<T[]>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.find({ withDeleted: false, take: limit })
        .then(result => resolve(ok<T[]>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  getByUid(uid: string): Promise<IHttpError | IHttpResponse<T>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.findOne({ where: { uid } })
        .then(result => resolve(ok<T>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  update(entity: any): Promise<IHttpError | IHttpResponse<DeleteResult | T>> {
    return new Promise(async (resolve, reject) => {
      this.genericRepository.findOne({ where: { uid: entity.uid } })
      .then(_=> {
        try {
           this.genericRepository.update(entity.uid, entity)
            .then(updated => resolve(ok<UpdateResult>(updated)))
            .catch(err => reject(badRequest(err)));
         } catch (error) {
          this.logger(error);
          reject(badRequest(this.defaultError));
         }
      }).catch(_ => resolve(badRequest(new Error('Not Exist'))));
    });
  }

  delete(uid: string): Promise<IHttpError | IHttpResponse<DeleteResult | T>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.softDelete(uid)
        .then(result => resolve(ok<DeleteResult | T>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  definitiveDelete(uid: string): Promise<IHttpError | IHttpResponse<DeleteResult | T>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.delete(uid)
        .then(result => resolve(ok<DeleteResult | T>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  restore(uid: string): Promise<IHttpError | IHttpResponse<UpdateResult | T>> {
    return new Promise((resolve, reject) => {
      try {
        this.genericRepository.restore(uid)
        .then(result => resolve(ok<UpdateResult | T>(result)))
        .catch(err => reject(badRequest(err)));
      } catch (error) {
        this.logger(error);
        reject(badRequest(this.defaultError));
      }
    });
  }

  logger = (any: any) => console.error('Logger => ', any);
}