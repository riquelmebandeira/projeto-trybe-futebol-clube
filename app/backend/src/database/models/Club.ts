import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  clubName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'club_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'club',
  timestamps: false,
});

export default Club;
