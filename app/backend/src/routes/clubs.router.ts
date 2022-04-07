import { Request, Response, Router } from 'express';
import { clubsControllerFactory } from '../factories';

const clubsRouter = Router();
const clubsController = clubsControllerFactory();

clubsRouter.get('/', async (_req: Request, res: Response) => {
  const clubs = await clubsController.getAll();

  res.status(200).json(clubs);
});

export default clubsRouter;
