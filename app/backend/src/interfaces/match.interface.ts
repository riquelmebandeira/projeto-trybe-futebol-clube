interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals?: number,
  homeClub: {
    clubName: string,
    id: number,
  }
  awayTeam: number,
  awayTeamGoals?: number,
  awayClub: {
    clubName: string,
    id: number,
  }
  inProgress: boolean
}

export default IMatch;
