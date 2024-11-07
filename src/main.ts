import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { winstonConfig } from './helpers/winston-logging';
import { HttpExceptionFilter } from './helpers/exception-filter';
import { WinstonModule } from 'nest-winston';

async function start() {
  const app = await NestFactory.create(AppModule,{
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const PORT = process.env.PORT || 3030;
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Worker Management API')
    .setDescription('API for managing workers, roles, and related operations')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
  });
}
start();
