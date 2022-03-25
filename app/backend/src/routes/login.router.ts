import { Request, Response, Router } from 'express';
import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import loginControllerFactory from '../factories';

const loginRouter = Router();
const loginController = loginControllerFactory();

loginRouter.post('/', async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await loginController.login(email);

  const { password, ...userInfo } = user;

  const jwtSecret = await fs.readFile('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign(userInfo, jwtSecret);

  res.status(200).json({ user: userInfo, token });
});

export default loginRouter;
