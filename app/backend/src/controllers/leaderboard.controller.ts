import { LeaderboardService } from '../services';
import ClubRanking from '../utils/ClubRanking';

class LeaderboardController {
  constructor(readonly leaderboardService: LeaderboardService) {}

  async getRankingsOf(homeOrAwayClubs: string): Promise<ClubRanking[]> {
    const result = await this.leaderboardService.getRankingsOf(homeOrAwayClubs);

    return result;
  }
}

export default LeaderboardController;
