import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

import { IUser } from '../interfaces';
import User from '../database/models/User';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { email } = jwt.verify(token, secret) as IUser;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User does not exist' });
    }

    res.locals = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJWT;
