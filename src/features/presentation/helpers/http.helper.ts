import { IHttpError, IHttpResponse } from '../../../core/infra';
import { NotFoundError, ServerError, Unauthorized } from '../errors';

export const ok = <T>(body: T): IHttpResponse<T> => {
  return { statusCode: 200, body } as IHttpResponse<T>;
};

export const badRequest = (body: Error): IHttpError => {
  return { statusCode: 400, body } as IHttpError;
};

export const notFound = (): IHttpError => {
  return { statusCode: 404, body: new NotFoundError() } as IHttpError;
};

export const serverError = (body: Error): IHttpError => {
  return { statusCode: 500, body: body ?? new ServerError() } as IHttpError;
};

export const unauthorized = (body: Error): IHttpError => {
    return { statusCode: 401, body: body ?? new Unauthorized(body.message) } as IHttpError;
};
