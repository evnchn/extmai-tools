import {getChartType} from '../common/chart-type';
import {Difficulty, getDifficultyForRecord} from '../common/difficulties';
import {getSongName} from '../common/fetch-score-util';
import {getGameRegionFromOrigin, isMaimaiNetOrigin} from '../common/game-region';
import {getDisplayLv} from '../common/level-helper';
import {addLvToSongTitle, fetchGameVersion} from '../common/net-helpers';
import {isNiconicoLinkImg} from '../common/song-name-helper';
import {loadSongDatabase} from '../common/song-props';
import {fetchSongDetailPage} from '../common/util';

(async function (d) {
  async function fetchChartLv(diff: Difficulty): Promise<string> {
    // First, try magic
    const gameVer = await fetchGameVersion(d.body);
    const gameRegion = getGameRegionFromOrigin(d.location.origin);
    const songDb = await loadSongDatabase(gameVer, gameRegion);

    const name = getSongName(d.body);
    const songImg = d.querySelector('img.music_img') as HTMLImageElement;
    const genre = name === 'Link' && isNiconicoLinkImg(songImg.src) ? 'niconico' : '';
    const chartType = getChartType(d.body);
    const props = songDb.getSongProperties(name, genre, chartType);
    if (props) {
      return getDisplayLv(props.lv[diff]);
    }

    // If magic does not work, load from maimai-NET.
    const songIdxElem = d.querySelector('input[name=idx]') as HTMLInputElement;
    const songDetailPage = await fetchSongDetailPage(songIdxElem.value);
    const lvElem = songDetailPage.querySelector(
      `.music_detail_table tr:nth-child(${diff + 1}) .music_lv_back`
    );
    return lvElem.innerHTML.trim();
  }

  if (
    isMaimaiNetOrigin(d.location.origin) &&
    d.location.pathname.includes('/maimai-mobile/record/playlogDetail/')
  ) {
    const diff = await getDifficultyForRecord(d.body);
    const lv = await fetchChartLv(diff);
    addLvToSongTitle(d.body, diff, lv);
  }
})(document);
