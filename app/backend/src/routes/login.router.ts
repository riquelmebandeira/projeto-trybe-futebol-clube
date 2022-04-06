import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
import loginControllerFactory from '../factories';

const loginRouter = Router();
const loginController = loginControllerFactory();

loginRouter.post('/', async (req: Request, res: Response) => {
  const { email, password: reqPassword } = req.body;

  if (!email || !reqPassword) return res.status(401).json({ message: 'All fields must be filled' });

  const user = await loginController.login(email, reqPassword);

  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });

  const { password, ...userInfo } = user;

  const jwtSecret = await fs.readFile('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign(userInfo, jwtSecret);

  res.status(200).json({ user: userInfo, token });
});

loginRouter.post('/validate', async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (authorization) {
    const jwtSecret = await fs.readFile('jwt.evaluation.key', 'utf-8');

    const userInfo = jwt.verify(authorization, jwtSecret) as IUser;

    return res.status(200).json(userInfo.role);
  }

  return res.status(401).json({ message: 'Token not found' });
});

export default loginRouter;
