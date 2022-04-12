import { IRanking } from '../interfaces';

const sortRankings = (rankings: IRanking[]): IRanking[] => (
  rankings.sort((a, b) =>
    b.totalPoints - a.totalPoints
|| b.totalVictories - a.totalVictories
|| b.goalsBalance - a.goalsBalance
|| b.goalsFavor - a.goalsFavor
|| b.goalsOwn - a.goalsOwn)
);

export default sortRankings;
