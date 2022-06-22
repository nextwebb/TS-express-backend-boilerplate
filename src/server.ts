/* eslint-disable no-console */
import express from 'express';
// import createError from 'http-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoDBDataSource } from './database/datasource/mongodb.datasource';
import modules from './modules';
import logging from './config/logging';

import app from './app';

app.use(cors());
const NAMESPACE = 'server';

dotenv.config({ path: `${__dirname}/.env` });

if (process.env.NODE_ENV === 'production') {
  new MongoDBDataSource()
    .connect()
    .then(() => {
      app.listen(process.env.PORT, () =>
        logging.info(
          NAMESPACE,
          `Server is running..  ${process.env.HOSTNAME}:${process.env.PORT}`,
        ),
      );
    })
    .catch((err: any) => {
      logging.info(NAMESPACE, `Error connecting to the DB`, err);
    });
} else {
  mongoose.Promise = global.Promise;
  mongoose
    .connect('mongodb://localhost:27017/image-repository')
    .then(() => console.log('docker mongodb container conneted!'))
    .catch((err: any) => console.log(err));
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', modules);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`),
);
