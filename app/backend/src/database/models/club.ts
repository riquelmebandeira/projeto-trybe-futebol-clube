import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: DataTypes.INTEGER,
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  timestamps: false,
});

export default Club;
