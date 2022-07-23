import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IHttpRequest } from '../../infra';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return this.validate(context.switchToHttp().getRequest());
  }
  
  async validate(request: IHttpRequest<any>): Promise<boolean> {
    let jwtHeader = request.headers.authorization;
    let jwtCookie = request.cookies.jwt;

    if (jwtHeader)
    jwtHeader = jwtHeader.replace(' ', '').replace('Bearer', '');

    if (!jwtCookie && !jwtHeader) return false;
    const valid = this.jwtService.verifyAsync(jwtCookie || jwtHeader);
    
    console.log((valid ? '✅' : '❎') + ' - Session');
    return new Promise((response, _) => response(valid));
  }
}
