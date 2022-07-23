import { Response, Request } from 'express';

import { User } from '../../../core/domain';

export interface IHttpResponse<T> extends Response {
    body: T;
    user: User;
}

export interface IHttpRequest<T> extends Request {
    body: T;
    headers: any;
    user: User;
}

export interface IHttpMiddleware<T> extends Request {
    body: T;
    user: User;
}

export interface IHttpError extends Response {
    body: Error;
    user: User;
}