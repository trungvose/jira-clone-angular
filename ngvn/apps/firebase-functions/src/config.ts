export interface Config {
  mongo: {
    uri: string;
    databaseName: string;
  };
  redis: {
    host: string;
    port: number;
    ttl: number; // 1 day
    password?: string;
  };
}
