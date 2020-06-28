import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', '/.trungk18.com/'],
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
