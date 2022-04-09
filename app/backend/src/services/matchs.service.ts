import { IMatch } from '../interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

class MatchsService {
  readonly matchsModel = Match;

  readonly clubsModel = Club;

  async getAll(): Promise<Match> {
    const result = await this.matchsModel.findAll({
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    });

    return result as unknown as Match;
  }

  async getByProgress(value: boolean): Promise<Match> {
    const result = await this.matchsModel.findAll({
      where: {
        inProgress: value,
      },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    });

    return result as unknown as Match;
  }

  async createMatch(payload: IMatch): Promise<IMatch | false> {
    const { awayTeam, homeTeam } = payload;

    const existingClubs = await Club.findAll({ where: {
      id: [awayTeam, homeTeam],
    } });

    if (existingClubs.length < 2) return false;

    const result = await this.matchsModel.create(payload);

    return result as unknown as IMatch;
  }

  async finishMatch(id: number): Promise<void> {
    await this.matchsModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default MatchsService;
