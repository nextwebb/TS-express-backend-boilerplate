/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import createError from 'http-errors';

export const hashPassword = (plainPassword: string) => {
  if (!plainPassword) {
    throw new Error('Error hashing password');
  }
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
};

export const isPasswordValid = (
  hashedPass: string,
  plainPass: string | Buffer,
) => bcrypt.compareSync(plainPass, hashedPass);

export const signAccessToken = (payload: string | object | Buffer) =>
  new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    JWT.sign(payload, secret, { expiresIn: '6h' }, (err, token) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(token);
    });
  });

export const verifyAccessToken = (token: string) =>
  new Promise((resolve, reject) => {
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return reject(new createError.Unauthorized(message));
      }
      return resolve(payload);
    });
  });
