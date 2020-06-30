import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const dbConfiguration = registerAs('db', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  dbName: process.env.MONGO_DB_NAME || 'jira-clone-local',
}));

export const InjectDbConfig = () => Inject(dbConfiguration.KEY);
