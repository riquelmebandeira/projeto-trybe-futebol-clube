import { IMatch, IRanking } from '../interfaces';

class ClubRanking {
  private id: number;

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

  private matchs: IMatch[];

  private homeMatchs: IMatch[];

  private awayMatchs: IMatch[];

  constructor(name: string, id: number, matchs: IMatch[]) {
    this.name = name;
    this.id = id;
    this.matchs = matchs;
  }

  filterHomeMatchs(): void {
    this.homeMatchs = this.matchs.filter(({ homeTeam }) => (homeTeam === this.id));
  }

  filterAwayMatchs(): void {
    this.awayMatchs = this.matchs.filter(({ awayTeam }) => (awayTeam === this.id));
  }

  getEfficiency(): void {
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  getGoalsBalance(): void {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  getHomeMatchsResults(): void {
    this.filterHomeMatchs();

    this.homeMatchs.forEach((match) => {
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

    this.getEfficiency();
    this.getGoalsBalance();
  }

  getAwayMatchsResults(): void {
    this.filterAwayMatchs();

    this.awayMatchs.forEach((match) => {
      if (+match.awayTeamGoals > +match.homeTeamGoals) {
        this.totalVictories += 1;
        this.totalPoints += 3;
      } else if (+match.awayTeamGoals < +match.homeTeamGoals) {
        this.totalLosses += 1;
      } else {
        this.totalDraws += 1;
        this.totalPoints += 1;
      }
      this.totalGames += 1;
      this.goalsFavor += +match.awayTeamGoals;
      this.goalsOwn += +match.homeTeamGoals;
    });

    this.getEfficiency();
    this.getGoalsBalance();
  }

  showResults(): IRanking {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalVictories: this.totalVictories,
      totalGames: this.totalGames,
      totalLosses: this.totalLosses,
      totalDraws: this.totalDraws,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}

export default ClubRanking;
