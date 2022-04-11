import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubRanking from './ClubRanking';

function calculateRankings(clubs: Club[], matchs: Match[]): ClubRanking[] {
  return clubs.map(({ id, clubName }) => {
    const ranking = new ClubRanking(clubName);

    const clubMatchs = matchs.filter(({ homeTeam }) => +homeTeam === id) as unknown as Match[];

    ranking.getMatchResults(clubMatchs);
    ranking.getGoalsBalance();
    ranking.getEfficiency();

    return ranking;
  });
}

export default calculateRankings;
