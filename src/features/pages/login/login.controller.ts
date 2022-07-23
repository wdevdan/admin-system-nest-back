import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { Response as Res } from 'express';

import { LoginGuard } from '../../../core/security/guards/login.guard';
import { HttpRequest, User } from '../../../core/domain';

@Controller('auth')
export class LoginController {
  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Request() request: HttpRequest<User>, @Response() response: Res) {
    const body = request.user; 

    if (body) {
      response.cookie('jwt', body, { httpOnly: true });
      return response.status(200).send({ body });
    } else response.clearCookie('jwt');

    return response.sendStatus(401);
  }

  @Post('logout')
  async logout(@Response() response: Res) {
    response.clearCookie('jwt');
    
    return response.status(200).json({ message: "session cleared" });
  }
}

// { passthrough: true } on res = problem!