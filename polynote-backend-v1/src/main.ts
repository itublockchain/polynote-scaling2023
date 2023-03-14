import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CONFIG } from 'src/config';
import { initPolybase } from 'src/utils/initPolybase';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.APP_PORT,
  });
  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: process.env.API_VERSION,
  });

  const config = new DocumentBuilder()
    .setTitle('Polynote')
    .setDescription('The Polynote API Docs')
    .setVersion(process.env.APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await initPolybase();

  await app.listen(CONFIG.PORT);
}
bootstrap();
