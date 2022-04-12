import { IRanking } from '../interfaces';
import { LeaderboardService } from '../services';

class LeaderboardController {
  constructor(readonly leaderboardService: LeaderboardService) {}

  async getHomeRankings(): Promise<IRanking[]> {
    const result = await this.leaderboardService.getHomeRankings();

    return result;
  }

  async getAwayRankings(): Promise<IRanking[]> {
    const result = await this.leaderboardService.getAwayRankings();

    return result;
  }

  async getGeneralRankings(): Promise<IRanking[]> {
    const result = await this.leaderboardService.getGeneralRankings();

    return result;
  }
}

export default LeaderboardController;
