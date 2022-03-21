import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  public id: number;

  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: string;

  public inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'home_team',
    references: {
      model: 'clubs',
      key: 'id'
    }
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'away_team',
    references: {
      model: 'clubs',
      key: 'id'
    }
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
