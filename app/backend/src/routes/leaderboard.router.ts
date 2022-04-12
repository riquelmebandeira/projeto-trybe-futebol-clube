import { Request, Response, Router } from 'express';
import { leaderboardControllerFactory } from '../factories';

const leaderboardRouter = Router();
const leaderboardController = leaderboardControllerFactory();

leaderboardRouter.get('/home', async (req: Request, res: Response) => {
  const rankings = await leaderboardController.getHomeRankings();

  res.status(200).json(rankings);
});

leaderboardRouter.get('/away', async (req: Request, res: Response) => {
  const rankings = await leaderboardController.getAwayRankings();

  res.status(200).json(rankings);
});

export default leaderboardRouter;
