import { Request, Response, Router } from 'express';
import { leaderboardControllerFactory } from '../factories';

const leaderboardRouter = Router();
const leaderboardController = leaderboardControllerFactory();

leaderboardRouter.get('/home', async (req: Request, res: Response) => {
  const rankings = await leaderboardController.getRanking();

  res.status(200).json(rankings);
});

export default leaderboardRouter;
