import { Request, Response, Router } from 'express';
import validateJWT from '../middlewares';
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

matchsRouter.post('/', validateJWT, async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, inProgress } = req.body;

  if (homeTeam === awayTeam) return res.status(400).json({ message: 'Clubs must be different' });

  if (inProgress !== 'true') {
    return res.status(400).json(
      { message: 'The match must be in progress' },
    );
  }

  const newMatch = await matchsController.createMatch(req.body);

  if (!newMatch) return res.status(400).json({ message: 'Both clubs must exist' });

  return res.status(201).json(newMatch);
});

export default matchsRouter;
