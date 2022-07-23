import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { Repository } from 'typeorm';

import { User } from '../../core/domain';

@Injectable()
export class UserConsultMiddleware {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
  private fields = ['uid', 'login', 'username'];

  async use(req: Request, res: Response, next: NextFunction) {
    const body: User | any = req.body;
    let conflict = false;

    for (let field of this.fields) {
      let result = await this.userRepo.findOne({ where: { [field]: body[field] }});
      
      if (result) { conflict = true; continue };
    }

    if (conflict)
    throw new BadRequestException('User already exists');
    
    next();
  }
}
