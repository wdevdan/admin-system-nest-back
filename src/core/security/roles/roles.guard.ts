import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { HttpRequest } from '../../domain';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('Roles Guard');
    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      console.log('No authentication required');
      return true;
    }
    
    const request = context.switchToHttp().getRequest<HttpRequest<any>>();
    const userRole = request.headers.role;

    if (!userRole) console.log('No user role defined');
    
    if (roles && userRole) return matchRoles(roles, userRole);
    else return false;
  }
}

export function matchRoles(roles: string[], role: any): boolean {
  if (!roles || !role || roles.length === 0) return false;  
  return roles.some(r => role.includes(r));
}
