import { DeleteResult, UpdateResult } from 'typeorm';

import { IHttpError, IHttpResponse } from './http.contract';

export interface IBaseService<T> {
  getByUid(uid: string): Promise<IHttpError | IHttpResponse<T>>;

  create(entity: T): Promise<IHttpError | IHttpResponse<T | any>>;
  update(entity: T): Promise<IHttpError | IHttpResponse<DeleteResult | T>>;
  delete(uid: string): Promise<IHttpError | IHttpResponse<DeleteResult | T>>;
  restore(uid: string): Promise<IHttpError | IHttpResponse<UpdateResult | T>>;

  getAll(): Promise<IHttpError | IHttpResponse<T[]>>;
  getAllLimited(id: number): Promise<IHttpError | IHttpResponse<T[]>>;
}
