import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const appConfiguration = registerAs('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 8080,
  domain: process.env.APP_DOMAIN || 'http://localhost:8080',
  env: process.env.NODE_ENV || 'development',
  clientDomain: process.env.CLIENT_DOMAIN || 'http://localhost:4200',
}));

export const InjectAppConfig = () => Inject(appConfiguration.KEY);
