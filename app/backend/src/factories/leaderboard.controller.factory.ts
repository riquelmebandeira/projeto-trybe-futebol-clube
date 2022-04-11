import { LeaderboardController } from '../controllers';
import { LeaderboardService } from '../services';

const leaderboardControllerFactory = () => {
  const leaderboardService = new LeaderboardService();
  const leaderboardController = new LeaderboardController(leaderboardService);
  return leaderboardController;
};

export default leaderboardControllerFactory;
