function _interopDefault(t) {
  return t && typeof t === 'object' && 'default' in t ? t.default : t;
}

Object.defineProperty(exports, '__esModule', { value: !0 });
const axios = _interopDefault(require('axios'));

const HTTPClient = axios.create({ baseURL: 'https://stats.nba.com' });

function getTeam(idTeam) {
  return HTTPClient({
    method: 'GET',
    url: `/stats/teamyearbyyearstats?LeagueID=00&PerMode=Totals&SeasonType=Regular+Season&TeamID=${idTeam}`,
  }).then(t => t.data.resultSets[0].rowSet);
}

function getAllTeam() {
  return HTTPClient({
    method: 'GET',
    url: '/stats/commonTeamYears/?LeagueID=00',
  }).then(t => t.data.resultSets[0].rowSet);
}
export { getTeam, getAllTeam };
