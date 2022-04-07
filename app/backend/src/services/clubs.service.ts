import Club from '../database/models/Club';

class ClubsService {
  readonly clubsModel = Club;

  async getAll(): Promise<Club> {
    const result = await this.clubsModel.findAll();

    return result as unknown as Club;
  }

  async getById(id: number): Promise<Club> {
    const result = await this.clubsModel.findByPk(id);

    return result as Club || null;
  }
}

export default ClubsService;
