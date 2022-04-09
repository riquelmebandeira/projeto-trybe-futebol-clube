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
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const newMatch = await matchsController.createMatch(req.body);

  if (!newMatch) {
    return res.status(401).json(
      { message: 'There is no team with such id!' },
    );
  }

  return res.status(201).json(newMatch);
});

matchsRouter.patch('/:id/finish', async (req: Request, res: Response) => {
  const { id } = req.params;

  await matchsController.finishMatch(+id);

  res.status(200).json({ message: 'The match was sucessfully finished' });
});

matchsRouter.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  await matchsController.updateMatch(+id, homeTeamGoals, awayTeamGoals);

  res.status(200).json({ message: 'The match was updated' });
});

export default matchsRouter;
