import { getTeam, getAllTeam } from './cli';
import { bold, error } from '../../utils/log';
import { basicTable } from '../../utils/table';
import { nameTeam } from './indexNameTeam';

const alignCenter = columns =>
  columns.map(content => ({ content, hAlign: 'center', vAlign: 'center' }));

const yearOfYear = async name => {
  const allTeam = await getAllTeam();
  let idTeam = 0;
  allTeam.forEach(team => {
    if (nameTeam(name) === team[4]) {
      idTeam = team[1].toString();
    }
  });
  if (idTeam === 0) {
    error(`nonexistent equipment`);
  } else {
    const teamYearOfYear = await getTeam(idTeam);
    const seasonTable = basicTable();
    seasonTable.push([
      { colSpan: 17, content: name.toUpperCase(), hAlign: 'center' },
    ]);

    seasonTable.push(
      alignCenter([
        bold('YEAR'),
        bold('GP'),
        bold('WIN'),
        bold('LOSS'),
        bold('WINPCT'),
        bold('CFRANK'),
        bold('DIVRANK'),
        bold('POWIN'),
        bold('PLOSS'),
        bold('REB'),
        bold('AST'),
        bold('PF'),
        bold('STL'),
        bold('TOV'),
        bold('BLK'),
        bold('PTS'),
        bold('PTRNK'),
      ])
    );

    teamYearOfYear.forEach(yearA => {
      const [
        teamId,
        teamCity,
        teamName,
        year,
        gp,
        wins,
        losses,
        winPct,
        confRank,
        divRank,
        poWins,
        poLosses,
        confCount,
        divCount,
        nbaFinalsAparence,
        fgm,
        fga,
        fgPct,
        fg3m,
        fg3a,
        fg3pct,
        ftm,
        fta,
        ftPct,
        oreb,
        dreb,
        reb,
        ast,
        pf,
        stl,
        tov,
        blk,
        pts,
        ptsRank,
      ] = yearA;
      seasonTable.concat(
        teamId,
        teamCity,
        teamName,
        confCount,
        divCount,
        nbaFinalsAparence,
        dreb,
        fgm,
        fga,
        fgPct,
        fg3m,
        fg3a,
        fg3pct,
        ftm,
        fta,
        ftPct,
        oreb
      );

      seasonTable.push(
        alignCenter([
          year,
          gp,
          wins,
          losses,
          winPct,
          confRank,
          divRank,
          poWins,
          poLosses,
          reb,
          ast,
          pf,
          stl,
          tov,
          blk,
          pts,
          ptsRank,
        ])
      );
    });

    console.log(seasonTable.toString());
  }
};
export default yearOfYear;
