(function() {
  const CHART_LEVELS = [
    "1", "2", "3", "4", "5",
    "6", "7", "7+", "8", "8+",
    "9", "9+", "10", "10+", "11",
    "11+", "12", "12+", "13", "13+",
    "14", "14+", "15"
  ];

  const RANK_TITLES = [
    "SSS+", "SSS", "SS+", "SS", "S+", "S",
    "AAA", "AA", "A", "BBB", "BB", "B", null
  ];

  const AP_FC_TYPES = [
    "AP+", "AP", "FC+", "FC", null
  ];

  function createMap(sections: string[], reverse: boolean) {
    const map = new Map();
    if (reverse) {
      sections.reverse();
    }
    for (const sec of sections) {
      map.set(sec, []);
    }
    if (reverse) {
      sections.reverse();
    }
    return map;
  }

  function getSectionTitle(prefix: string, section: string, size: number, totalSize: number) {
    let title = "\u25D6";
    if (prefix && section) {
      title += prefix + " " + section;
    } else if (prefix) {
      title += "NO " + prefix;
    } else if (section) {
      title += section;
    } else {
      title += " --- ";
    }
    return title + "\u25D7\u3000\u3000\u3000" + size + "/" + totalSize;
  }

  function createRowsWithSection(map: Map<string, HTMLElement[]>, headingPrefix: string, totalSize: number) {
    let rows: HTMLElement[] = [];
    map.forEach((subRows, section) => {
      if (subRows.length) {
        const sectionHeading = document.createElement("div");
        sectionHeading.className = "screw_block m_15 f_15";
        sectionHeading.innerText = getSectionTitle(
          headingPrefix, section, subRows.length, totalSize
        );
        rows.push(sectionHeading);
        rows = rows.concat(subRows);
      }
    });
    return rows;
  }

  function getChartLevel(row: HTMLElement) {
    return (row.getElementsByClassName("music_lv_block")[0] as HTMLElement).innerText;
  }

  function sortRowsByLevel(rows: NodeListOf<HTMLElement>, reverse: boolean) {
    const map = createMap(CHART_LEVELS, reverse);
    rows.forEach(row => {
      const lv = getChartLevel(row);
      map.get(lv).push(row);
    });
    return createRowsWithSection(map, "LEVEL", rows.length);
  }

  function getRankTitle(row: HTMLElement) {
    const imgs = row.children[0].querySelectorAll("img");
    if (imgs.length < 5) {
      return null;
    }
    const rankImgSrc = imgs[imgs.length-1].src;
    const lastUnderscoreIdx = rankImgSrc.lastIndexOf("_");
    const lastDotIdx = rankImgSrc.lastIndexOf(".");
    const lowercaseRank = rankImgSrc.substring(lastUnderscoreIdx + 1, lastDotIdx);
    return lowercaseRank.replace("p", "+").toUpperCase();
  }

  function getAchievement(row: HTMLElement) {
    const elem = row.querySelector(".music_score_block.w_120") as HTMLElement;
    return elem ? parseFloat(elem.innerText) : elem;
  }

  function compareAchievement(row1: HTMLElement, row2: HTMLElement) {
    const ach1 = getAchievement(row1), ach2 = getAchievement(row2);
    if (ach1 === null && ach2 === null) {
      return 0;
    } else if (ach2 === null) {
      return -1;
    } else if (ach1 === null) {
      return 1;
    }
    return ach1 > ach2 ? -1 : ach1 < ach2 ? 1 : 0;
  }

  function sortRowsByRank(rows: NodeListOf<HTMLElement>, reverse: boolean) {
    const map = createMap(RANK_TITLES, reverse);
    rows.forEach(row => {
      const rank = getRankTitle(row);
      map.get(rank).push(row);
    });
    map.forEach((subRows) => {
      subRows.sort(compareAchievement);
      if (reverse) {
        subRows.reverse();
      }
    });
    return createRowsWithSection(map, "RANK", rows.length);
  }

  function getApFcStatus(row: HTMLElement) {
    const imgs = row.children[0].querySelectorAll("img");
    if (imgs.length < 5) {
      return null;
    }
    const statusImgSrc = imgs[imgs.length-2].src;
    const lastUnderscoreIdx = statusImgSrc.lastIndexOf("_");
    const lastDotIdx = statusImgSrc.lastIndexOf(".");
    const lowercaseStatus = statusImgSrc.substring(lastUnderscoreIdx + 1, lastDotIdx);
    if (lowercaseStatus === "back") {
      return null;
    }
    return lowercaseStatus.replace("ap", "AP").replace("p", "+").toUpperCase();
  }

  function sortRowsByApFc(rows: NodeListOf<HTMLElement>, reverse: boolean) {
    const map = createMap(AP_FC_TYPES, reverse);
    rows.forEach(row => {
      const rank = getApFcStatus(row);
      map.get(rank).push(row);
    });
    return createRowsWithSection(map, "", rows.length);
  }

  function performSort(sortBy: string) {
    const rows = document.body.querySelectorAll(".main_wrapper.t_c .w_450.m_15.f_0") as NodeListOf<HTMLElement>;
    const screwBlocks = Array.from(
      document.body.querySelectorAll(".main_wrapper.t_c .screw_block") as NodeListOf<HTMLElement>
    );
    let sortedRows = null;
    switch (sortBy) {
      case "level_des":
        sortedRows = sortRowsByLevel(rows, true);
        break;
      case "level_asc":
        sortedRows = sortRowsByLevel(rows, false);
        break;
      case "rank_des":
        sortedRows = sortRowsByRank(rows, false);
        break;
      case "rank_asc":
        sortedRows = sortRowsByRank(rows, true);
        break;
      case "ap_fc_des":
        sortedRows = sortRowsByApFc(rows, false);
        break;
      case "ap_fc_asc":
        sortedRows = sortRowsByApFc(rows, true);
        break;
      default:
        return;
    }
    for (let i = 1; i < screwBlocks.length; i++) {
      screwBlocks[i].remove();
    }
    const firstScrewBlock = screwBlocks[0];
    for (let i = sortedRows.length - 1; i >= 1; i--) {
      firstScrewBlock.insertAdjacentElement("afterend", sortedRows[i]);
    }
    firstScrewBlock.innerText = sortedRows[0].innerText;
  }

  function expandDualChartRows() {
    const songRecords = document.querySelectorAll('div.w_450.m_15.p_r.f_0[id]') as NodeListOf<HTMLElement>;
    songRecords.forEach((row) => {
      row.style.removeProperty("display");
      row.style.removeProperty("margin-top");
      if (row.id.includes("sta_")) {
        row.querySelector(".music_kind_icon_dx").remove();
      } else {
        row.querySelector(".music_kind_icon_standard").remove();
      }
      const chartTypeImg = row.children[1] as HTMLImageElement;
      chartTypeImg.onclick = null;
      chartTypeImg.className = "music_kind_icon";
    });
  }

  function createOption(label: string, value: string) {
    const option = document.createElement("option");
    option.innerText = label;
    option.value = value;
    return option;
  }

  function createSortOptions() {
    const id = "scoreSortContainer";
    let div = document.getElementById(id);
    if (div) {
      return div;
    }
    div = document.createElement("div");
    div.id = id;
    div.className = "w_450 m_15";
    // const span = document.createElement("span");
    // span.className = "f_16";
    // span.innerText = "Sort: ";
    // div.append(span);
    const select = document.createElement("select");
    select.className = "w_300 m_10";
    select.addEventListener("change", (evt: Event) => {
      performSort((evt.target as HTMLSelectElement).value);
    });
    select.append(createOption("-- Choose Sort Option --", "none"));
    select.append(createOption("Level (high \u2192 low)", "level_des"));
    select.append(createOption("Level (low \u2192 high)", "level_asc"));
    select.append(createOption("Rank (high \u2192 low)", "rank_des"));
    select.append(createOption("Rank (low \u2192 high)", "rank_asc"));
    select.append(createOption("AP/FC (AP+ \u2192 FC)", "ap_fc_des"));
    select.append(createOption("AP/FC (FC \u2192 AP+)", "ap_fc_asc"));
    div.append(select);
    return div;
  }

  // main
  expandDualChartRows();
  const firstScrewBlock = document.body.querySelector(".main_wrapper.t_c .screw_block");
  if (firstScrewBlock) {
    firstScrewBlock.insertAdjacentElement("beforebegin", createSortOptions());
  }
})();