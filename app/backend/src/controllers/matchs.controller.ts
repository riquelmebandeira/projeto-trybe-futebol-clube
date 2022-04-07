import { MatchsService } from '../services';
import Match from '../database/models/Match';

class MatchsController {
  constructor(readonly matchsService: MatchsService) {}

  async getAll(): Promise<Match> {
    const result = await this.matchsService.getAll();

    return result as unknown as Match;
  }

  async getByProgress(value: boolean): Promise<Match> {
    const result = await this.matchsService.getByProgress(value);

    return result as unknown as Match;
  }
}

export default MatchsController;
