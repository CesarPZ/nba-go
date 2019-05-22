import inquirer from 'inquirer';
import emoji from 'node-emoji';
import { limit } from 'stringz';
import { center, left, right } from 'wide-align';
import pMap from 'p-map';
import ora from 'ora';
import { i18n } from '../../i18nConfig';

import getBroadcastNetworks from './network';
import Team from '../Team';

import NBA from '../../utils/nba';
import { bold, neonGreen } from '../../utils/log';
import catchAPIError from '../../utils/catchAPIError';

const MAX_WIDTH = 81;
const TEAMNAME_WIDTH = 20;
const STATUS_WIDTH = 18;
const NETWORK_WIDTH = 35;
const MAX_WIDTH_WITH_NETWORKS = 156;

const padHomeTeamName = name => bold(right(name, TEAMNAME_WIDTH));
const padVisitorTeamName = name => bold(left(name, TEAMNAME_WIDTH));
const padGameStatus = status => center(status, STATUS_WIDTH);
const padHomeTeamNetwork = network => bold(right(network, NETWORK_WIDTH));
const padAwayTeamNetwork = network => bold(left(network, NETWORK_WIDTH));

const createGameChoice = (homeTeam, visitorTeam, periodTime, broadcasters) => {
  let winner = '';
  const { period_status: periodStatus, game_clock: gameClock } = periodTime;

  if (+homeTeam.getScore() > +visitorTeam.getScore()) {
    winner = 'home';
  } else if (+homeTeam.getScore() === +visitorTeam.getScore()) {
    winner = null;
  } else {
    winner = 'visitor';
  }

  const homeTeamName = padHomeTeamName(
    winner === 'home'
      ? homeTeam.getWinnerName('left')
      : homeTeam.getName({ color: true })
  );
  const visitorTeamName = padVisitorTeamName(
    winner === 'visitor'
      ? visitorTeam.getWinnerName('right')
      : visitorTeam.getName({ color: true })
  );
  const match = `${homeTeamName}${center(
    emoji.get('basketball'),
    8
  )}${visitorTeamName}`;
  const homeTeamScore =
    winner === 'home'
      ? right(bold(neonGreen(homeTeam.getScore())), 4)
      : right(bold(homeTeam.getScore()), 4);
  const visitorTeamScore =
    winner === 'visitor'
      ? left(bold(neonGreen(visitorTeam.getScore())), 4)
      : left(bold(visitorTeam.getScore()), 4);
  const score = `${homeTeamScore} : ${visitorTeamScore}`;

  if (broadcasters) {
    const networks = getBroadcastNetworks(broadcasters.tv.broadcaster);
    const networksOutput = `${padHomeTeamNetwork(
      networks.homeTeam
    )} ${emoji.get('tv')}  ${padAwayTeamNetwork(networks.visitorTeam)}|`;
    return `│⌘${match}│${score}│${padGameStatus(
      `${bold(periodStatus)} ${gameClock}`
    )}│${networksOutput}`;
  }
  return `│⌘${match}│${score}│${padGameStatus(
    `${bold(periodStatus)} ${gameClock}`
  )}│`;
};

const getTeamInfo = async (team, seasonId) => {
  try {
    const { teamInfoCommon: teamInfo } = await NBA.teamInfoCommon({
      TeamID: team.id,
      Season: seasonId,
    });

    return new Team({
      ...teamInfo[0],
      score: team.score,
      linescores: team.linescores,
      isHomeTeam: true,
    });
  } catch (err) {
    catchAPIError(err, 'NBA.teamInfoCommon()');
  }
};

const chooseGameFromSchedule = async (gamesData, option) => {
  const spinner = ora(
    `${i18n.__(`Loading Game Schedule...`)}0/(${gamesData.length})`
  ).start();
  let networksHeader = '';

  if (option.networks) {
    networksHeader = `${padHomeTeamNetwork(i18n.__('Home'))} ${emoji.get(
      'tv'
    )}  ${padAwayTeamNetwork(i18n.__('Away'))}|`;
  }

  const header = `│ ${padHomeTeamName(i18n.__('Home'))}${center(
    emoji.get('basketball'),
    8
  )}${padVisitorTeamName(i18n.__('Away'))}│${center(
    i18n.__('Score'),
    11
  )}│${padGameStatus(i18n.__('Status'))}│${networksHeader}`;

  const tableWidth = !option.networks ? MAX_WIDTH : MAX_WIDTH_WITH_NETWORKS;
  const questions = [
    {
      name: 'game',
      message: i18n.__('Which game do you want to watch?'),
      type: 'list',
      pageSize: 30,
      choices: [
        new inquirer.Separator(`${limit('', tableWidth, '─')}`),
        new inquirer.Separator(header),
        new inquirer.Separator(`${limit('', tableWidth, '─')}`),
      ],
    },
  ];

  const last = gamesData.length - 1;

  await pMap(
    gamesData,
    async (gameData, index) => {
      const { home, visitor, period_time, broadcasters } = gameData;
      const homeTeam = await getTeamInfo(home, process.env.season);
      const visitorTeam = await getTeamInfo(visitor, process.env.season);

      spinner.text = `${i18n.__(`Loading Game Schedule...`)}(${index + 1}/${
        gamesData.length
      })`;

      questions[0].choices.push({
        name: createGameChoice(
          homeTeam,
          visitorTeam,
          period_time,
          !option.networks ? null : broadcasters
        ),
        value: { gameData, homeTeam, visitorTeam },
      });

      if (index !== last) {
        questions[0].choices.push(
          new inquirer.Separator(`${limit('', tableWidth, '─')}`)
        );
      } else {
        questions[0].choices.push(
          new inquirer.Separator(`${limit('', tableWidth, '─')}`)
        );
      }
    },
    { concurrency: 1 }
  );

  spinner.stop();

  const answer = await inquirer.prompt(questions);

  return answer;
};

export default chooseGameFromSchedule;
export { getTeamInfo };
