/* eslint-disable import/no-unresolved */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logging from '../../config/logging';
import { IDataSource } from '../interfaces';

const NAMESPACE = 'MongodbDatasource';
dotenv.config();

export class MongoDBDataSource implements IDataSource {
  connect = async () => {
    try {
      const connection = await mongoose.connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      });
      logging.info(NAMESPACE, 'DB connected');
      //   console.log('DB CONNECTED');
      return connection;
    } catch (error) {
      logging.error(NAMESPACE, '', error);
      throw Error('Error connecting to repository datasource');
    }
  };

  disconnect = async () => {
    try {
      await mongoose.connection.close();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
}
