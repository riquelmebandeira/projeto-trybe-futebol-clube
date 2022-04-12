interface IRanking {
  name: string,
  totalPoints: number,
  totalVictories: number,
  totalGames: number,
  totalLosses: number,
  totalDraws: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export default IRanking;
