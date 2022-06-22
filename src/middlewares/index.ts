import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const mustBeLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token =
    req.headers['x-access-token'] ||
    req.headers.authorization ||
    req.body.token;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWTSECRET);
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Sorry, you must provide a valid token.',
    });
  }
};

/* eslint-disable linebreak-style */
export const validator =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validationValue = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      convert: false,
      skipFunctions: true,
    });
    if (validationValue.error) {
      const errorMessages = validationValue.error.details.map(
        (error: { message: any }) => error.message,
      );

      return res.status(422).json({ error: errorMessages });
    }

    return next();
  };
