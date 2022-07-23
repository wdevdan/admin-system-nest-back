import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { validate as ModelValidator } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../domain';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private jwtService: JwtService) {}
  private newError = (name: string) => new BadRequestException(name);

  async validateUser(userInput: User): Promise<any | null> {
    const { login, password }= userInput;
    console.log('User Validation');
    
    const isValid = await this.validateEntity(userInput);
    if (!isValid) throw this.newError('Invalid User');
    
    const result = await this.userRepo.findOne({ login });
    if (!result) throw new NotFoundException('User not found');

    const passwordMatch = bcrypt.compareSync(password, result.password);
    if (!passwordMatch) throw this.newError('Password mismatch');
    
    return await this.jwtService.signAsync({ uid: result.uid, login });
  }

  private async validateEntity(entity: any): Promise<boolean | any[]> {
    return new Promise(async (resolver, _) => {
      let model = new User();

      model.CreationFields.forEach((field) => model[field] = entity[field]);
      const errors = await ModelValidator(model);
      resolver(errors.length == 0);
    });
  }
}
