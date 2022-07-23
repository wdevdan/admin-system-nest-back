import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IHttpRequest } from '../../infra';
import { AuthService } from '../shared';
import { User } from '../../domain';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request);
  }
  
  async validate(request: IHttpRequest<User>): Promise<any> {
    let user = request.body as User;
    let success = true;

    let jwt = await this.authService.validateUser(user);

    if (jwt) request.user = jwt;
    else success = false;

    return new Promise((res, _) => res(success));
  }
}
