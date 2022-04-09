import { IMatch } from '../interfaces';
import { MatchsService } from '../services';
import Match from '../database/models/Match';

class MatchsController {
  constructor(readonly matchsService: MatchsService) {}

  async getAll(): Promise<Match> {
    const result = await this.matchsService.getAll();

    return result;
  }

  async getByProgress(value: boolean): Promise<Match> {
    const result = await this.matchsService.getByProgress(value);

    return result;
  }

  async createMatch(payload: IMatch): Promise<IMatch | false> {
    const result = await this.matchsService.createMatch(payload);

    return result;
  }
}

export default MatchsController;
