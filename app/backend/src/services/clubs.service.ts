import Club from '../database/models/Club';

class ClubsService {
  readonly clubsModel = Club;

  async getAll(): Promise<Club> {
    const result = await this.clubsModel.findAll();

    return result as unknown as Club;
  }
}

export default ClubsService;
