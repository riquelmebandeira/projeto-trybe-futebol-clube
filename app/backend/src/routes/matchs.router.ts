import { Request, Response, Router } from 'express';
import { matchsControllerFactory } from '../factories';

const matchsRouter = Router();
const matchsController = matchsControllerFactory();

matchsRouter.get('/', async (req: Request, res: Response) => {
  const { inProgress } = req.query; // recebe uma STRING "true" ou "false"

  if (inProgress) {
    const booleanValue = (inProgress === 'true');

    const matchs = await matchsController.getByProgress(booleanValue);

    return res.status(200).json(matchs);
  }

  const matchs = await matchsController.getAll();

  res.status(200).json(matchs);
});

export default matchsRouter;
