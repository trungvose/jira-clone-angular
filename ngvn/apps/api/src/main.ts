/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@ngvn/api/common';
import { appConfiguration, arenaConfiguration, redisConfiguration } from '@ngvn/api/config';
import { AppConfig, ArenaConfig, RedisConfig } from '@ngvn/api/types';
import { queueNames } from '@ngvn/background/common';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

const Arena = require('bull-arena');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfig>(appConfiguration.KEY);
  app.enableCors({ credentials: true, origin: appConfig.clientDomain });

  const globalPrefix = 'api';
  const redisConfig = app.get<RedisConfig>(redisConfiguration.KEY);
  const arenaConfig = app.get<ArenaConfig>(arenaConfiguration.KEY);

  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());

  const arena = new Arena(
    {
      queues: queueNames.map((queueName) => ({
        name: queueName,
        hostId: queueName,
        redis: { host: redisConfig.host, port: redisConfig.port },
        type: 'bull',
      })),
    },
    arenaConfig,
  );
  const arenaEndpoint = `/${globalPrefix}/arena`;
  app.use(arenaEndpoint, arena);
  Logger.log(`Arena: ${appConfig.domain}${arenaEndpoint}`, 'NestApplication');

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Jira Clone API')
    .setDescription('API documentation for Jira Clone')
    .setVersion('1.0.0')
    .addServer(`${appConfig.domain}/${globalPrefix}`, 'Development API')
    .addBearerAuth()
    .addCookieAuth('rtok')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup('api/docs', app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  Logger.log(`Swagger Docs enabled: ${appConfig.domain}/${globalPrefix}/docs`, 'NestApplication');

  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port, () => {
    Logger.log('Listening at ' + appConfig.domain + '/' + globalPrefix, 'NestApplication');
  });
}

bootstrap();
