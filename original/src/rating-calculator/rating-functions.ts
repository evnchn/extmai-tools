import {compareNumber} from "../common/number-helper";
import {getRankDefinitions, RankDef} from "../common/rank-functions";
import {SongProperties} from "../common/song-props";

export function calculateRatingRange(lv: number, rank: RankDef) {
  const rankDefs = getRankDefinitions();
  const idx = rankDefs.indexOf(rank);
  const maxAchv = idx >= 1 ? rankDefs[idx - 1].minAchv - 0.0001 : rank.minAchv;
  const minRating = Math.floor((lv * rank.minAchv * rank.factor) / 100);
  const maxRating = Math.floor((lv * maxAchv * rank.factor) / 100);
  return [minRating, maxRating];
}

export function calculateMaxRating(
  songs: ReadonlyArray<SongProperties>,
  count: number
) {
  let allLvs: number[] = [];
  for (const song of songs) {
    allLvs = allLvs.concat(
      song.lv.filter((lv) => typeof lv === "number").map((lv) => Math.abs(lv))
    );
  }
  allLvs.sort(compareNumber);
  const topLvs = allLvs.slice(Math.max(0, allLvs.length - count));
  const topRank = getRankDefinitions()[0];
  let totalRating = 0;
  for (const lv of topLvs) {
    totalRating += Math.floor((lv * topRank.minAchv * topRank.factor) / 100);
  }
  return totalRating;
}
