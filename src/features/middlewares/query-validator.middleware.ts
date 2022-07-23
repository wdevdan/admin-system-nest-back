import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { badRequest, RequireFieldsValidator } from '../presentation';
import { HttpError } from '../../core/domain';

@Injectable()
export class QueryValidatorMiddleware implements NestMiddleware {
  private fields = ['uid'];

  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.query);
    next();
  }
}
