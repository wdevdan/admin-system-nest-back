import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { badRequest, RequireFieldsValidator } from '../presentation';
import { HttpError } from '../../core/domain';

@Injectable()
export class FieldValidatorMiddleware implements NestMiddleware {
  private fields = ['uid'];

  use(req: Request, res: Response, next: NextFunction) {
    for (let field of this.fields) {
      const error = new RequireFieldsValidator(field).validate(req.body);
    
      if (error) {
        const httpError = new HttpError(badRequest(error));
        return res.status(httpError.statusCode).json(httpError.body);
      }
    }

    next();
  }
}
