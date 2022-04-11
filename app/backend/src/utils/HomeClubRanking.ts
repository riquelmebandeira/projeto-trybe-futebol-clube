import { IMatch } from '../interfaces';
import ClubRanking from './ClubRanking';

class HomeClubRanking extends ClubRanking {
  constructor(name: string, id: number, matchs: IMatch[]) {
    super(name);

    const clubMatchs = matchs.filter(({ homeTeam }) => (
      homeTeam === id
    ));

    this.getMatchResults(clubMatchs);
    this.getGoalsBalance();
    this.getEfficiency();
  }

  getMatchResults(matchs: IMatch[]): void {
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
}

export default HomeClubRanking;
