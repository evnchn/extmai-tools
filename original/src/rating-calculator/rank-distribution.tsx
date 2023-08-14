import {ChartRecord} from '../common/chart-record';
import {getRankDefinitions, getRankTitle} from '../common/rank-functions';

export function getRankDistribution(scoreList: ReadonlyArray<ChartRecord>): Map<string, number> {
  const rankDefs = getRankDefinitions();
  const countPerRank = new Map();
  for (const r of rankDefs) {
    countPerRank.set(r.title, 0);
  }
  scoreList.forEach((record) => {
    const rankTitle = getRankTitle(record.achievement);
    const rankCount = countPerRank.get(rankTitle);
    countPerRank.set(rankTitle, rankCount + 1);
  });
  return countPerRank;
}

export function getRankMap(records: ReadonlyArray<ChartRecord>) {
  const overallRankDistribution = getRankDistribution(records);
  const rankMap = new Map<string, boolean>();
  let remaining = records.length;
  for (const [rank, count] of overallRankDistribution) {
    if (remaining > 0) {
      rankMap.set(rank, true);
    }
    remaining -= count;
  }
  return rankMap;
}
