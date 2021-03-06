import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import validateJWT from '../middlewares';
import { loginControllerFactory } from '../factories';

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

loginRouter.get('/validate', validateJWT, async (req: Request, res: Response) => {
  const { role } = res.locals;

  res.status(200).json(role);
});

export default loginRouter;
