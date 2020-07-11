import { Inject } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const dbConfiguration = registerAs('db', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  dbName: process.env.MONGO_DB_NAME || 'jira-clone-local',
  retryAttempts: Number(process.env.MONGO_RETRY_ATTEMPTS) || 5,
  retryDelay: Number(process.env.MONGO_RETRY_DELAY) || 1000,
  useFindAndModify: Boolean(process.env.MONGO_FIND_AND_MODIFY) || false,
  useNewUrlParser: Boolean(process.env.MONGO_NEW_URL_PARSER) || true,
  useCreateIndex: Boolean(process.env.MONGO_CREATE_INDEX) || true,
  useUnifiedTopology: Boolean(process.env.MONGO_UNIFIED_TOPOLOGY) || true,
}));

export const InjectDbConfig = () => Inject(dbConfiguration.KEY);
