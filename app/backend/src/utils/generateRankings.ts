import { IMatch } from '../interfaces';
import Club from '../database/models/Club';
import ClubRanking from './ClubRanking';
import HomeClubRanking from './HomeClubRanking';
import AwayClubRanking from './AwayClubRanking';

function generateRankings(clubs: Club[], matchs: IMatch[], homeOrAwayClubs: string): ClubRanking[] {
  if (homeOrAwayClubs === 'homeClubs') {
    return clubs.map(({ clubName, id }) => {
      const ranking = new HomeClubRanking(clubName, id, matchs);

      return ranking;
    });
  }
  return clubs.map(({ clubName, id }) => {
    const ranking = new AwayClubRanking(clubName, id, matchs);

    return ranking;
  });
}

export default generateRankings;
