import { IHttpError, IHttpMiddleware, IHttpRequest, IHttpResponse } from '../../../../core/infra';
import { User } from '../../entity';

export class HttpResponse<T> {
  statusCode: number;
  user: User;
  body: T;

  constructor(_: IHttpResponse<T>) {
    this.statusCode = _.statusCode;
    this.user = _.user;
    this.body = _.body;
  }
}

export class HttpRequest<T> {
  body: T;
  user: User;
  params: any;
  cookies: any;
  headers: any;

  constructor(_: IHttpRequest<T>) {
    this.body = _.body;
    this.user = _.user;
    this.params = _.params;
    this.cookies = _.cookies;
    this.headers = _.headers;
  }
}

export class HttpMiddleware<T> {
  body: T;
  user: User;
  cookies: any;
  headers: any;

  constructor(_: IHttpMiddleware<T>) {
    this.body = _.body;
    this.user = _.user;
    this.cookies = _.cookies;
    this.headers = _.headers;
  }
}

export class HttpError {
  statusCode: number;
  user: User;
  body: Error;

  constructor(_: IHttpError) {
    this.statusCode = _.statusCode;
    this.user = _.user;
    this.body = _.body;
  }
}