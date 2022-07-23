import { MiddlewareConsumer, Module, NestModule, RequestMethod as _ } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { configService } from './config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserService } from './features/pages/user/user.service';
import { ItemService } from './features/pages/item/item.service';
import { SessionGuard } from './core/security/guards/session.guard';
import { UserController } from './features/pages/user/user.controller';
import { ItemController } from './features/pages/item/item.controller';
import { ProductService } from './features/pages/product/product.service';
import { ProductController } from './features/pages/product/product.controller';
import { UserDataService } from './features/pages/user/user-data/user-data.service';
import { UserDataController } from './features/pages/user/user-data/user-data.controller';

import { LoginController } from './features/pages/login/login.controller';
import { User, UserData, Device, Token, Item, Product } from './core/domain';

import { AuthService } from './core/security';
import { CryptographyStrategy } from './core/security/crypto';
import { LoggerMiddleware, UserConsultMiddleware } from './features/middlewares';

@Module({
  providers: [
    AppService, AuthService, SessionGuard, CryptographyStrategy, UserService, ItemService, ProductService, UserDataService
  ],
  controllers: [
    AppController, LoginController, UserController, ItemController, ProductController, UserDataController
  ],
  imports: [
    JwtModule.register(configService.getJwtConfig()),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, UserData, Device, Token, Item, Product]),
  ],
})
export class AppModule implements NestModule {
  private addMiddleware = (method, path, middleware, consumer) => consumer.apply(middleware).forRoutes({ path, method });

  configure(consumer: MiddlewareConsumer) {
    this.addMiddleware(_.POST, 'user', UserConsultMiddleware, consumer);
    this.addMiddleware(_.GET, 'item/limit/*', LoggerMiddleware, consumer);
  }
}
