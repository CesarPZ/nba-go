export function nameTeam(name) {
  const teamName = name.toUpperCase();
  switch (teamName) {
    case 'CHICAGO':
      return 'CHI';
    case 'ATLANTA':
      return 'ATL';
    case 'BOSTON':
      return 'BOS';
    case 'CLEVELAND':
      return 'CLE';
    case 'PELICANS':
      return 'NOP';
    case 'DALAS':
      return 'DAL';
    case 'DENVER':
      return 'DEN';
    case 'GOLDEN':
      return 'GSW';
    case 'HOUSTON':
      return 'HOU';
    case 'CLIPPERS':
      return 'LAC';
    case 'MIAMI':
      return 'MIA';
    case 'MILWAUKEE':
      return 'MIL';
    case 'MINNESOTA':
      return 'MIN';
    case 'NETS':
      return 'BKN';
    case 'KNICKS':
      return 'NYK';
    case 'ORLANDO':
      return 'ORL';
    case 'INDIANA':
      return 'IND';
    case 'PHILADELPHIA':
      return 'PHI';
    case 'PHOENIX':
      return 'PHX';
    case 'PORTLAND':
      return 'POR';
    case 'SACRAMENTO':
      return 'SAC';
    case 'SPURS':
      return 'SAS';
    case 'OKLAHOMA':
      return 'OKC';
    case 'TORONTO':
      return 'TOR';
    case 'UTAH':
      return 'UTA';
    case 'MEMPHIS':
      return 'MEM';
    case 'WASHINGTON':
      return 'WAS';
    case 'DETROIT':
      return 'DET';
    case 'HORNETS':
      return 'CHA';
    default:
      return teamName;
  }
}
