import { IMatch } from '../interfaces';
import generateRankings from '../utils/generateRankings';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubRanking from '../utils/ClubRanking';

class LeaderboardService {
  readonly clubsModel = Club;

  readonly matchsModel = Match;

  async getRankingsOf(homeOrAwayClubs: string): Promise<ClubRanking[]> {
    const clubs = await this.clubsModel.findAll();

    const matchs = await this.matchsModel.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    }) as unknown as IMatch[];

    const rankings = homeOrAwayClubs === 'homeClubs' ? generateRankings(clubs, matchs, 'homeClubs')
      : generateRankings(clubs, matchs, 'awayClubs');

    return rankings.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }
}

export default LeaderboardService;
