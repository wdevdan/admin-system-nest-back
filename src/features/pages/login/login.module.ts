import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';

@Module({
  providers: [],
  imports: [LoginModule],
  controllers: [LoginController]
})
export class LoginModule {}
