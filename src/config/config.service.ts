/* eslint-disable @typescript-eslint/no-var-requires */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Item, Product, User, UserData } from '../core/domain';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getCorsConfig() {
    return {
      origin: 'http://localhost:4200',
      credentials: true,
    };
  }

  public getPort = () => this.getValue('PORT', true);

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRATION_TIME'),
      },
    }
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      schema: this.getValue('POSTGRES_SCHEMA'),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      
      cli: {
        migrationsDir: 'src\migrations',
        entitiesDir: 'src\core\domain\entity',
      },
      
      migrationsTableName: 'migrations',
      autoLoadEntities: true, // to auto load entities
      synchronize: true, // to detect product router
      // schema:sync // not tested
 
      // migrations: ['src\migrations\*{.ts,.js}'],
      // entities: ['src\core\domain\entity\*.ts'],
      
      // entities: [
      //   User, UserData, Item, Product
      // ],

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_SCHEMA',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
