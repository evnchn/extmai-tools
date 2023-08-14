import React from 'react';

import {getDifficultyName} from '../../common/difficulties';
import {isMaimaiNetOrigin, MAIMAI_NET_ORIGINS} from '../../common/game-region';
import {QueryParam} from '../../common/query-params';
import {parseJudgements} from '../parser';
import {NoteType, StrictJudgementMap} from '../types';
import {CreditInfo} from './CreditInfo';
import {PageFooter} from './PageFooter';
import {PageTitle} from './PageTitle';
import {ScorePageContainer} from './ScorePageContainer';
import {SectionSep} from './SectionSeparator';

const defaultPlayRecord = {
  date: String(Date.now()),
  track: 'TRACK ' + (Math.floor(Math.random() * 3) + 1),
  // difficulty: 3,
  songTitle: '分からない',
  achievement: '95.3035%', // finale: "94.87%",
  highScore: Math.random() > 0.9 ? '1' : '0',
  // combo: "234/953",
  noteDetails: '654-96-31-28\n25-0-0-0\n78-0-0-1\n\n37-2-1-0',
};

type MessageType = {
  action: string;
  payload?: string;
  img?: Blob;
  imgSrc?: string;
};

function padNumberWithZeros(n: number, len?: number) {
  len = len || 2;
  return n.toString().padStart(len, '0');
}

function formatDate(dt: Date) {
  return (
    dt.getFullYear() +
    '-' +
    padNumberWithZeros(dt.getMonth() + 1) +
    '-' +
    padNumberWithZeros(dt.getDate()) +
    ' ' +
    padNumberWithZeros(dt.getHours()) +
    ':' +
    padNumberWithZeros(dt.getMinutes())
  );
}

function getQueryParam(qp: URLSearchParams, key: string, fallback?: string) {
  const value = qp.get(key);
  if (!value) {
    console.warn('URL does not contain "' + key + '", using default value "' + fallback + '"');
    return fallback;
  }
  return value;
}

function parseQueryParams(qp: URLSearchParams, dft = defaultPlayRecord) {
  const date = getQueryParam(qp, QueryParam.Date, dft.date);
  const track = getQueryParam(qp, QueryParam.Track, dft.track);
  const rawDifficulty = getQueryParam(qp, QueryParam.Difficulty);
  const songTitle = getQueryParam(qp, QueryParam.SongTitle, dft.songTitle);
  const achievement = getQueryParam(qp, QueryParam.Achievement, dft.achievement);
  const highScore = getQueryParam(qp, QueryParam.HighScore, dft.highScore);
  const combo = getQueryParam(qp, QueryParam.Combo);
  const noteDetails = getQueryParam(qp, QueryParam.NoteDetails, dft.noteDetails);
  const syncStatus = getQueryParam(qp, QueryParam.SyncStatus);
  // TODO: handling NaN for parseInt
  const difficulty = getDifficultyName(parseInt(rawDifficulty));
  return {
    date: formatDate(new Date(parseInt(date))),
    track,
    songTitle,
    difficulty,
    syncStatus,
    noteJudgements: parseJudgements(noteDetails),
    combo: combo && combo.replace('/', ' / '),
    highScore: highScore === '1',
    achievement: parseFloat(achievement),
  };
}

interface RootComponentState {
  songTitle: string;
  achievement: number;
  noteJudgements: Map<NoteType, StrictJudgementMap>;
  difficulty?: string;
  track: string;
  date: string;
  highScore?: boolean;
  combo?: string;
  syncStatus?: string;
  songImg?: string;
  rankImg: Map<string, string>;
  apFcImg?: string;
  syncImg?: string;
  showError?: boolean;
}

export class RootComponent extends React.PureComponent<{}, RootComponentState> {
  private referrer = document.referrer && new URL(document.referrer).origin;

  constructor(props: {}) {
    super(props);
    const qp = new URLSearchParams(location.search);
    try {
      this.state = {
        ...parseQueryParams(qp),
        rankImg: new Map(),
      };
    } catch (e) {
      console.error((e as Error).message);
      console.error((e as Error).stack);
      this.state = {
        ...parseQueryParams(new URLSearchParams()),
        rankImg: new Map(),
        showError: true,
      };
    }
  }

  componentDidMount() {
    document.title = this.state.songTitle + ' - maimai classic score layout';
    window.addEventListener('message', this.handleWindowMessage);
    this.sendMessageToOpener({action: 'ready'});
  }

  render() {
    const {
      achievement,
      combo,
      date,
      difficulty,
      highScore,
      noteJudgements,
      songTitle,
      track,
      songImg,
      apFcImg,
      rankImg,
      syncImg,
      syncStatus,
      showError,
    } = this.state;
    return (
      <React.Fragment>
        <div className="widthLimit">
          <div className="container">
            <PageTitle />
            <SectionSep />
            {showError ? (
              <div className="error">Failed to parse input. Please contact the developer!</div>
            ) : (
              <ScorePageContainer
                achievement={achievement}
                combo={combo}
                date={date}
                difficulty={difficulty}
                highScore={highScore}
                noteJudgements={noteJudgements}
                songTitle={songTitle}
                track={track}
                syncStatus={syncStatus}
                songImgSrc={songImg}
                apFcImg={apFcImg}
                rankImg={rankImg}
                syncImg={syncImg}
                fetchRankImage={this.fetchRankImage}
              />
            )}
            <SectionSep />
            <PageFooter />
          </div>
        </div>
        <CreditInfo />
      </React.Fragment>
    );
  }

  private sendMessageToOpener(data: MessageType) {
    if (window.opener) {
      console.log('sending message to opener', data);
      if (this.referrer) {
        window.opener.postMessage(data, this.referrer);
      } else {
        // Unfortunately, document.referrer is not set when mai-tools is run on localhost.
        // Send message to all maimai net origins and pray that one of them will respond.
        for (const origin of MAIMAI_NET_ORIGINS) {
          window.opener.postMessage(data, origin);
        }
      }
    }
  }

  private fetchRankImage = (title: string) => {
    console.log('fetchRankImage ' + title);
    this.state.rankImg.set(title, null);
    this.sendMessageToOpener({action: 'getRankImage', payload: title});
  };

  private handleWindowMessage = (evt: MessageEvent) => {
    if (isMaimaiNetOrigin(evt.origin)) {
      this.referrer = evt.origin;
      switch (evt.data.action) {
        case 'songImage':
          this.setState({songImg: evt.data.imgSrc});
          break;
        case 'apFcImage':
          this.setState({apFcImg: URL.createObjectURL(evt.data.img)});
          break;
        case 'syncImage':
          this.setState({syncImg: URL.createObjectURL(evt.data.img)});
          break;
        case 'rankImage':
          this.setState((state) => {
            const existingUrl = state.rankImg.get(evt.data.title);
            if (existingUrl) {
              URL.revokeObjectURL(existingUrl);
            }
            const map = new Map(state.rankImg);
            map.set(evt.data.title, URL.createObjectURL(evt.data.img));
            return {rankImg: map};
          });
          break;
        default:
          console.log(evt.data);
          break;
      }
    }
  };
}
