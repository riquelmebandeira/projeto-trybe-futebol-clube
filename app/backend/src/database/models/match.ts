import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './club';

class Match extends Model {
  public id: number;

  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: string;

  public inProgress: boolean;
}

Match.init({
  id: DataTypes.INTEGER,
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeam' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
