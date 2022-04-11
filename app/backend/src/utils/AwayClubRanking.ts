import { IMatch } from '../interfaces';
import ClubRanking from './ClubRanking';

class AwayClubRanking extends ClubRanking {
  constructor(name: string, id: number, matchs: IMatch[]) {
    super(name);

    const clubMatchs = matchs.filter(({ awayTeam }) => (
      +awayTeam === id
    ));

    this.getMatchResults(clubMatchs);
    this.getGoalsBalance();
    this.getEfficiency();
  }

  getMatchResults(matchs: IMatch[]): void {
    matchs.forEach((match) => {
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
  }
}

export default AwayClubRanking;
