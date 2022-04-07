import { Request, Response, Router } from 'express';
import { clubsControllerFactory } from '../factories';

const clubsRouter = Router();
const clubsController = clubsControllerFactory();

clubsRouter.get('/', async (_req: Request, res: Response) => {
  const clubs = await clubsController.getAll();

  res.status(200).json(clubs);
});

clubsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const club = await clubsController.getById(+id);

  if (!club) return res.status(404).json({ message: 'Club not found' });

  res.status(200).json(club);
});

export default clubsRouter;
