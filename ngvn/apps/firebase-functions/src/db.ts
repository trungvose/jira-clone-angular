import mongoose from 'mongoose';
import { Config } from './config';

export async function initDb(mongoConfig: Config['mongo']) {
  await mongoose
    .connect(mongoConfig.uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to mongodb');
    })
    .catch((err) => {
      console.log('Error connecting to mongodb', JSON.stringify(err));
      return Promise.reject(err);
    });
}
