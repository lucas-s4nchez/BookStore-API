import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  DomainExceptionFilter,
  ApplicationExceptionFilter,
} from './shared/infraestructure/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true },
  //   }),
  // );
  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new ApplicationExceptionFilter(),
  );

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
