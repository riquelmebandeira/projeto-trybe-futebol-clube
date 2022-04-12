import { IMatch, IRanking } from '../interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubRanking from '../utils/ClubRanking';
import sortRankings from '../utils/sortRankings';

class LeaderboardService {
  readonly clubsModel = Club;

  readonly matchsModel = Match;

  async getClubs(): Promise<Club[]> {
    return this.clubsModel.findAll();
  }

  async getMatchs(): Promise<IMatch[]> {
    return this.matchsModel.findAll({
      where: {
        inProgress: false,
      },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    }) as unknown as IMatch[];
  }

  async getHomeRankings(): Promise<IRanking[]> {
    const clubs = await this.getClubs();
    const matchs = await this.getMatchs();

    const rankings = clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, matchs);

      clubRanking.getHomeMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }

  async getAwayRankings(): Promise<IRanking[]> {
    const clubs = await this.getClubs();
    const matchs = await this.getMatchs();

    const rankings = clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, matchs);

      clubRanking.getAwayMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }

  async getGeneralRankings(): Promise<IRanking[]> {
    const clubs = await this.getClubs();
    const matchs = await this.getMatchs();

    const rankings = clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, matchs);

      clubRanking.getHomeMatchsResults();
      clubRanking.getAwayMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }
}

export default LeaderboardService;
