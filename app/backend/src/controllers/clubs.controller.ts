import { ClubsService } from '../services';
import Club from '../database/models/Club';

class ClubsController {
  constructor(readonly clubsService: ClubsService) {}

  async getAll(): Promise<Club> {
    const result = await this.clubsService.getAll();

    return result as unknown as Club;
  }
}

export default ClubsController;
