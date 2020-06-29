/*
 * Project: Angular Jira clone
 * Author: Trung Vo (trungk18@gmail.com)
 * Homepage: https://github.com/trungk18/jira-clone-angular
 * -----
 * Last Modified: Monday, 29th June 2020 9:43:45 am
 * Modified By: Trung Vo (trungk18@gmail.com>)
 * -----
 * Copyright 2020 Trung Vo
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', /.trungk18.com/],
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
