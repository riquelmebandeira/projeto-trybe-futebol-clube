import { Request, Response, Router } from 'express';
import { matchsControllerFactory } from '../factories';

const matchsRouter = Router();
const matchsController = matchsControllerFactory();

matchsRouter.get('/', async (_req: Request, res: Response) => {
  const matchs = await matchsController.getAll();

  res.status(200).json(matchs);
});

export default matchsRouter;
