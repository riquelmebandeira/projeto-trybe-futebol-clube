import calculateRankings from '../utils/calculateRankings';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubRanking from '../utils/ClubRanking';

class LeaderboardService {
  readonly clubsModel = Club;

  readonly matchsModel = Match;

  async getRankings(): Promise<ClubRanking[]> {
    const clubs = await this.clubsModel.findAll();

    const matchs = await this.matchsModel.findAll({
      raw: true,
      where: {
        inProgress: false,
      },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    });

    const rankings = calculateRankings(clubs, matchs);

    return rankings.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }
}

export default LeaderboardService;
