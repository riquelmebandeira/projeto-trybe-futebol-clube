import { IMatch, IRanking } from '../interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubRanking from '../utils/ClubRanking';
import sortRankings from '../utils/sortRankings';

class LeaderboardService {
  readonly clubsModel = Club;

  readonly matchsModel = Match;

  private clubs: Club[];

  private matchs: IMatch[];

  constructor() {
    this.getClubs();
    this.getMatchs();
  }

  async getClubs(): Promise<void> {
    this.clubs = await this.clubsModel.findAll();
  }

  async getMatchs(): Promise<void> {
    this.matchs = await this.matchsModel.findAll({
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
    const rankings = this.clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, this.matchs);

      clubRanking.getHomeMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }

  async getAwayRankings(): Promise<IRanking[]> {
    const rankings = this.clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, this.matchs);

      clubRanking.getAwayMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }

  async getGeneralRankings(): Promise<IRanking[]> {
    const rankings = this.clubs.map(({ clubName, id }) => {
      const clubRanking = new ClubRanking(clubName, id, this.matchs);

      clubRanking.getHomeMatchsResults();
      clubRanking.getAwayMatchsResults();

      return clubRanking.showResults();
    });
    return sortRankings(rankings);
  }
}

export default LeaderboardService;
