import Club from '../database/models/Club';
import Match from '../database/models/Match';

class MatchsService {
  readonly matchsModel = Match;

  async getAll(): Promise<Match> {
    const result = await this.matchsModel.findAll({
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ],
    });

    return result as unknown as Match;
  }
}

export default MatchsService;
