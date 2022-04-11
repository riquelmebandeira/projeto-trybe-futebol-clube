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

  getEfficiency(): void {
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  getGoalsBalance(): void {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }
}

export default ClubRanking;
