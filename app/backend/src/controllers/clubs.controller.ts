import { ClubsService } from '../services';
import Club from '../database/models/Club';

class ClubsController {
  constructor(readonly clubsService: ClubsService) {}

  async getAll(): Promise<Club> {
    const result = await this.clubsService.getAll();

    return result as unknown as Club;
  }

  async getById(id: number): Promise<Club> {
    const result = await this.clubsService.getById(id);

    return result as Club || null;
  }
}

export default ClubsController;
