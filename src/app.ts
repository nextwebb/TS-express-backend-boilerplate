import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import modules from './modules';

dotenv.config();

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// register all routes
app.get('/', (req, res) => {
  res.send('working!');
});

app.use('/api/v1', modules);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(
  (
    err: { message: any; status: any },
    req: { app: { get: (arg0: string) => string } },
    res: {
      locals: { message: any; error: any };
      status: (arg0: any) => void;
      render: (arg0: string) => void;
    },
    next: any,
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  },
);

export default app;
