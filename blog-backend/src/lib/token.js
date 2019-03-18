// @flow
import jwt from 'jsonwebtoken';

const { JWT_SECRET: secret } = process.env;

export const generate = (payload: any, options: any): Promise<string> => {
  const a = { ...options };
  
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      issuer: 'velog.io',
      expiresIn: '7d',
      ...options,
    }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const decode = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};