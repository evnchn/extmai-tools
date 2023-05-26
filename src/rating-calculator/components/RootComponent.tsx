import React from 'react';

import {ChartRecord} from '../../common/chart-record';
import {
  GameRegion,
  getGameRegionFromOrigin,
  isMaimaiNetOrigin,
  MAIMAI_NET_ORIGINS,
} from '../../common/game-region';
import {
  GameVersion,
  RATING_CALCULATOR_SUPPORTED_VERSIONS,
  validateGameVersion,
} from '../../common/game-version';
import {getInitialLanguage, Language, saveLanguage} from '../../common/lang';
import {LangContext} from '../../common/lang-react';
import {fetchMagic, readMagicFromCache, writeMagicToCache} from '../../common/magic';
import {QueryParam} from '../../common/query-params';
import {
  buildSongPropsMap,
  filterSongsByVersion,
  getSongsByVersion,
  MatchMode,
  SongProperties,
} from '../../common/song-props';
import {analyzePlayerRating} from '../rating-analyzer';
import {RatingData} from '../types';
import {InternalLvInput} from './InternalLvInput';
import {LanguageChooser} from './LanguageChooser';
import {OtherTools} from './OtherTools';
import {PageFooter} from './PageFooter';
import {RatingOutput} from './RatingOutput';
import {RegionSelect} from './RegionSelect';
import {ScoreInput} from './ScoreInput';
import {VersionSelect} from './VersionSelect';

const MessagesByLang = {
  [Language.en_US]: {
    computeRating: 'Calculate Rating',
  },
  [Language.zh_TW]: {
    computeRating: '計算 Rating 值',
  },
  [Language.ko_KR]: {
    computeRating: '레이팅 계산하기',
  },
};

function readSongProperties(
  gameVer: GameVersion,
  gameRegion: GameRegion,
  inputText: string
): Promise<Map<string, SongProperties[]>> {
  return new Promise((resolve) => {
    // Read from user input
    if (inputText.length > 0) {
      resolve(buildSongPropsMap(gameVer, gameRegion, inputText));
      return;
    }
    // Read from cache
    const cachedGameData = readMagicFromCache(gameVer);
    if (cachedGameData) {
      resolve(buildSongPropsMap(gameVer, gameRegion, cachedGameData));
      return;
    }
    // Read from Internet
    console.log('Magic happening...');
    fetchMagic(gameVer).then((responseText) => {
      if (!responseText.startsWith('<!DOCTYPE html>')) {
        writeMagicToCache(gameVer, responseText);
      }
      resolve(buildSongPropsMap(gameVer, gameRegion, responseText));
    });
  });
}

interface State {
  lang: Language;
  progress: string;
  gameRegion: GameRegion;
  gameVer: GameVersion;
  ratingData?: RatingData;
  playerName: string | null;
  friendIdx: string | null;
  songPropsByName?: Map<string, ReadonlyArray<SongProperties>>;
  oldSongs?: ReadonlyArray<SongProperties>;
  newSongs?: ReadonlyArray<SongProperties>;
}

export class RootComponent extends React.PureComponent<{}, State> {
  private playerGradeIndex = 0;
  private internalLvTextarea = React.createRef<HTMLTextAreaElement>();
  private referrer = document.referrer && new URL(document.referrer).origin;
  private playerScores: ChartRecord[] = [];

  constructor(props: {}) {
    super(props);
    const queryParams = new URLSearchParams(location.search);
    const dxVersionQueryParam = queryParams.get(QueryParam.GameVersion);
    const gameVer = validateGameVersion(
      dxVersionQueryParam,
      RATING_CALCULATOR_SUPPORTED_VERSIONS[0],
      RATING_CALCULATOR_SUPPORTED_VERSIONS[RATING_CALCULATOR_SUPPORTED_VERSIONS.length - 1]
    );

    const friendIdx = queryParams.get(QueryParam.FriendIdx);
    const playerName = queryParams.get(QueryParam.PlayerName);
    const lang = getInitialLanguage();
    updateDocumentTitle(lang);

    this.state = {
      lang,
      gameRegion: GameRegion.Jp,
      gameVer,
      friendIdx,
      playerName,
      progress: '',
    };
    if (window.opener) {
      this.initWindowCommunication();
    }
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (
      this.state.songPropsByName &&
      ((!this.state.oldSongs && !this.state.newSongs) || prevState.gameVer !== this.state.gameVer)
    ) {
      this.loadSongLists(this.state.gameVer);
    }
    if (this.state.lang != prevState.lang) {
      updateDocumentTitle(this.state.lang);
    }
  }

  render() {
    const {
      lang,
      gameRegion,
      gameVer,
      playerName,
      ratingData,
      songPropsByName,
      oldSongs,
      newSongs,
      progress,
    } = this.state;
    const messages = MessagesByLang[lang];
    return (
      <LangContext.Provider value={lang}>
        <table className="inputSelectTable">
          <LanguageChooser activeLanguage={lang} changeLanguage={this.changeLanguage} />
          <RegionSelect gameRegion={gameRegion} handleRegionSelect={this.selectRegion} />
          <VersionSelect gameVer={gameVer} handleVersionSelect={this.selectVersion} />
        </table>
        <InternalLvInput ref={this.internalLvTextarea} />
        <ScoreInput />
        <div className="actionArea">
          <button className="analyzeRatingBtn" onClick={this.analyzeRating}>
            {messages.computeRating}
          </button>
        </div>
        {progress ? <p>{progress}</p> : null}
        <hr className="sectionSep" />
        {ratingData && (
          <RatingOutput
            gameRegion={gameRegion}
            gameVer={gameVer}
            songPropsByName={songPropsByName}
            ratingData={ratingData}
            playerGradeIndex={this.playerGradeIndex}
            playerName={playerName}
            oldSongs={oldSongs}
            newSongs={newSongs}
          />
        )}
        <PageFooter />
        <OtherTools gameVer={gameVer} />
      </LangContext.Provider>
    );
  }

  private changeLanguage = (lang: Language) => {
    this.setState({lang});
    saveLanguage(lang);
    this.postMessageToOpener({action: 'saveLanguage', payload: lang});
  };

  private selectVersion = (gameVer: GameVersion) => {
    this.setState({gameVer}, this.analyzeRating);
  };

  private selectRegion = (gameRegion: GameRegion) => {
    this.setState({gameRegion}, this.analyzeRating);
  };

  private analyzeRating = async (evt?: React.SyntheticEvent) => {
    if (evt) {
      evt.preventDefault();
    }
    const songPropsText = this.getInternalLvInput();
    const {gameVer, gameRegion} = this.state;
    console.log('gameVer', gameVer);
    const songPropsByName = await readSongProperties(gameVer, gameRegion, songPropsText);
    console.log('Song properties:', songPropsByName);
    const playerScores = this.playerScores;
    console.log('Player scores:', playerScores);
    if (!playerScores.length) {
      this.setState({ratingData: undefined});
      return;
    }
    const ratingData = await analyzePlayerRating(
      songPropsByName,
      playerScores,
      gameVer,
      gameRegion
    );
    console.log('Rating Data:', ratingData);
    this.setState({ratingData, songPropsByName});
  };

  private postMessageToOpener(data: {action: string; payload?: string | number}) {
    if (window.opener) {
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

  private initWindowCommunication() {
    window.addEventListener('message', (evt) => {
      if (isMaimaiNetOrigin(evt.origin)) {
        console.log(evt.origin, evt.data);
        let payloadAsInt;
        switch (evt.data.action) {
          case 'gameVersion':
            this.setState({
              gameRegion: getGameRegionFromOrigin(evt.origin),
              gameVer: validateGameVersion(
                evt.data.payload,
                RATING_CALCULATOR_SUPPORTED_VERSIONS[0]
              ),
            });
            break;
          case 'playerGrade':
            payloadAsInt = parseInt(evt.data.payload);
            if (payloadAsInt) {
              this.playerGradeIndex = payloadAsInt;
            }
            break;
          case 'showProgress':
            this.setState({progress: evt.data.payload});
            break;
          case 'setPlayerScore':
            this.playerScores = evt.data.payload;
            break;
          case 'calculateRating':
            this.analyzeRating();
            break;
          case 'allSongs':
            this.setState({
              oldSongs: filterSongsByVersion(
                evt.data.payload,
                this.state.songPropsByName,
                this.state.gameVer,
                MatchMode.OLDER
              ),
            });
            break;
          case 'newSongs':
            if (evt.data.payload.length) {
              this.setState({
                newSongs: filterSongsByVersion(
                  evt.data.payload,
                  this.state.songPropsByName,
                  this.state.gameVer,
                  MatchMode.EQUAL
                ),
              });
            } else {
              this.setState({
                newSongs: getSongsByVersion(this.state.songPropsByName, this.state.gameVer),
              });
            }
            break;
        }
      }
    });
    const {friendIdx, lang} = this.state;
    if (friendIdx) {
      // Analyze friend rating
      this.postMessageToOpener({action: 'getFriendRecords', payload: friendIdx});
    } else {
      // Analyze self rating
      this.postMessageToOpener({action: 'ready', payload: lang});
    }
  }

  private loadSongLists(gameVer: GameVersion) {
    this.postMessageToOpener({action: 'fetchAllSongs'});
    this.postMessageToOpener({action: 'fetchNewSongs', payload: gameVer});
  }

  private getInternalLvInput(): string {
    if (this.internalLvTextarea.current) {
      return this.internalLvTextarea.current.value;
    }
    return '';
  }
}

function updateDocumentTitle(lang: Language) {
  switch (lang) {
    case Language.en_US:
      document.title = 'maimai DX Rating Analyzer';
      break;
    case Language.zh_TW:
      document.title = 'maimai DX R 值分析工具';
      break;
  }
}
