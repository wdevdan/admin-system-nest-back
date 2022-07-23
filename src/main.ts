import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import { configService } from './config/config.service';
import { AppModule } from './app.module';

const data = {
  API_TAG: "Alpha",
  API_TITLE: "My Custom API",
  API_VERSION: "v0.8.0",
  API_DESCRIPTION: "This is my application!",
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.getPort() || '3000';

  if (!configService.isProduction()) 
    SwaggerModule.setup('docs', app, SwaggerModule
    .createDocument(app, new DocumentBuilder().addBearerAuth()
    .setTitle(data.API_TITLE).setDescription(data.API_DESCRIPTION)
    .setVersion(data.API_VERSION).addTag(data.API_TAG).build()));

  const corsConfig = configService.getCorsConfig();
  app.use(cookieParser()); // for read and parsing cookies
  app.use(bodyParser.json()); // for parse json encoded bodies
  
  // app.enableCors(corsConfig); // for enable CORS not functionaly
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require('cors')(corsConfig)); // functionaly cors

  await app.listen(parseInt(port));
}

bootstrap();
