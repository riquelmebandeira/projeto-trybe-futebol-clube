import Match from '../database/models/Match';

class ClubRanking {
  public name: string;

  public totalPoints = 0;

  public totalGames = 0;

  public totalVictories = 0;

  public totalDraws = 0;

  public totalLosses = 0;

  public goalsFavor = 0;

  public goalsOwn = 0;

  public goalsBalance = 0;

  public efficiency = 0;

  constructor(name: string) {
    this.name = name;
  }

  getMatchResults(matchs: Match[]): void {
    matchs.forEach((match) => {
      if (+match.homeTeamGoals > +match.awayTeamGoals) {
        this.totalVictories += 1;
        this.totalPoints += 3;
      } else if (+match.homeTeamGoals < +match.awayTeamGoals) {
        this.totalLosses += 1;
      } else {
        this.totalDraws += 1;
        this.totalPoints += 1;
      }
      this.totalGames += 1;
      this.goalsFavor += +match.homeTeamGoals;
      this.goalsOwn += +match.awayTeamGoals;
    });
  }

  getEfficiency(): void {
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  getGoalsBalance(): void {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }
}

export default ClubRanking;
