import { LeaderboardService } from '../services';
import ClubRanking from '../utils/ClubRanking';

class LeaderboardController {
  constructor(readonly leaderboardService: LeaderboardService) {}

  async getRanking(): Promise<ClubRanking[]> {
    const result = await this.leaderboardService.getRankings();

    return result;
  }
}

export default LeaderboardController;
