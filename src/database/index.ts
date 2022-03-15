import mongoose from 'mongoose';
import { config } from '../config';

export const connection = mongoose.connection;

connection.once('open', function () {
  console.log('### MongoDB database connection established successfully');
});

export function dbConnect() {
  return mongoose.connect(config.databaseUrl);
}
