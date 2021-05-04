(()=>{"use strict";var e={5929:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.fetchFriendScores=n.FRIEND_SCORE_URLS=void 0;const r=t(4007),o=t(4871);n.FRIEND_SCORE_URLS=new Map([["Re:MASTER","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=4&idx="],["MASTER","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=3&idx="],["EXPERT","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=2&idx="],["ADVANCED","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=1&idx="]]),n.fetchFriendScores=function(e,t,a){return i(this,void 0,void 0,(function*(){let i=n.FRIEND_SCORE_URLS.get(t);if(!i)return;i+=e;const c=(yield o.fetchPage(i)).querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:a};c.forEach((e=>function(e,n,t){const i=e.classList.contains("screw_block"),o=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_3")&&e.classList.contains("f_0");if(i)t.genre=e.innerText;else if(o){const i=r.getSongName(e),o=r.getChartLevel(e),a=1===r.getChartType(e)?"DX":"STANDARD",c=function(e){const n=e.querySelector("td.w_120.f_b:last-child"),t=n&&n.innerText.trim();return"0"!==t&&"― %"!==t?t:null}(e);if(!c)return;t.scoreList.push([i,t.genre,n,o,a,c].join("\t"))}}(e,t,s)))}))}},4007:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlayerGrade=n.getPlayerName=n.getChartType=n.getChartDifficulty=n.getChartLevel=n.getSongName=void 0,n.getSongName=function(e){return e.getElementsByClassName("music_name_block")[0].innerText},n.getChartLevel=function(e){return e.getElementsByClassName("music_lv_block")[0].innerText},n.getChartDifficulty=function(e){if(!e.classList.contains("pointer")){const n=e.querySelector(".pointer");e=n||e}const n=e.className.match(/music_([a-z]+)_score_back/)[1].toUpperCase();return 0===n.indexOf("RE")?"Re:MASTER":n},n.getChartType=function(e){return e.id?e.id.includes("sta_")?0:1:e.querySelector("img:nth-child(2)").src.includes("_standard")?0:1},n.getPlayerName=function(e){var n,t;return e.className.includes("friend_vs_friend_block")?null===(n=e.querySelector(".t_l"))||void 0===n?void 0:n.innerText:null===(t=e.querySelector(".name_block"))||void 0===t?void 0:t.innerText},n.fetchPlayerGrade=function(e){const n=e.querySelector(".user_data_block_line ~ img.h_25");if(n){const e=n.src.lastIndexOf("grade_");return n.src.substring(e+6,e+8)}return null}},2847:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.fetchScores=n.SELF_SCORE_URLS=void 0;const r=t(4007),o=t(4871);n.SELF_SCORE_URLS=new Map([["Re:MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=4"],["MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=3"],["EXPERT","/maimai-mobile/record/musicGenre/search/?genre=99&diff=2"],["ADVANCED","/maimai-mobile/record/musicGenre/search/?genre=99&diff=1"]]),n.fetchScores=function(e,t){return i(this,void 0,void 0,(function*(){const i=n.SELF_SCORE_URLS.get(e);if(!i)return;const a=yield o.fetchPage(i),c=a.querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:t};return c.forEach((n=>function(e,n,t){const i=e.classList.contains("screw_block"),o=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_r")&&e.classList.contains("f_0");if(i)t.genre=e.innerText;else if(o){const i=r.getSongName(e),o=r.getChartLevel(e),a=1===r.getChartType(e)?"DX":"STANDARD",c=function(e){const n=e.querySelector(".music_score_block.w_120");return n&&n.innerText}(e);if(!c)return;t.scoreList.push([i,t.genre,n,o,a,c].join("\t"))}}(n,e,s))),a}))}},1735:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.LANG=void 0;const t=new URLSearchParams(location.search);let i="en";t.get("hl")?i=t.get("hl").startsWith("zh")?"zh":"en":navigator.language.startsWith("zh")&&(i="zh"),n.LANG=i},6016:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.statusText=void 0;const i={zh:{advStart:"🕓 下載黃譜成績中…",advDone:"✔ 黃譜成績下載完畢！",expStart:"🕓 下載紅譜成績中…",expDone:"✔ 紅譜成績下載完畢！",masStart:"🕓 下載紫譜成績中…",masDone:"✔ 紫譜成績下載完畢！",remStart:"🕓 下載白譜成績中…",remDone:"✔ 白譜成績下載完畢！"},en:{advStart:"🕓 Downloading Advanced scores…",advDone:"✔ Advanced scores downloaded!",expStart:"🕓 Downloading Expert scores…",expDone:"✔ Expert scores downloaded!",masStart:"🕓 Downloading Master scores…",masDone:"✔ Master scores downloaded!",remStart:"🕓 Downloading Re:Master scores…",remDone:"✔ Re:Master scores downloaded!"}}[t(1735).LANG];n.statusText=function(e,n){switch(e){case"Re:MASTER":return n?i.remDone:i.remStart;case"MASTER":return n?i.masDone:i.masStart;case"EXPERT":return n?i.expDone:i.expStart;case"ADVANCED":return n?i.advDone:i.advStart}return""}},7377:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.getScriptHost=void 0,n.getScriptHost=function(e){const n=Array.from(document.querySelectorAll("script"));for(;n.length;){const t=n.pop();if(t.src.includes(e)){const e=new URL(t.src),n=e.pathname;return e.origin+n.substring(0,n.lastIndexOf("/scripts"))}}return"https://myjian.github.io/mai-tools"}},868:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.isNicoNicoLink=n.getSongNickname=n.getSongIdx=n.RATING_TARGET_SONG_NAME_PREFIX=n.DX_SONG_NAME_SUFFIX=void 0;const r=t(4871);n.DX_SONG_NAME_SUFFIX=" [DX]",n.RATING_TARGET_SONG_NAME_PREFIX="▶ ",n.getSongIdx=function(e){return e.getElementsByTagName("form")[0].elements.namedItem("idx").value},n.getSongNickname=function(e,t,i){return"Link"===e&&(e=t.includes("niconico")?"Link(nico)":"Link(org)"),i?e+n.DX_SONG_NAME_SUFFIX:e};let o={};n.isNicoNicoLink=function(e){return i(this,void 0,void 0,(function*(){if(o.nico===e)return!0;if(o.original===e)return!1;const n=(yield r.fetchPage("/maimai-mobile/record/musicDetail/?"+new URLSearchParams([["idx",e]]).toString())).body.querySelector(".m_10.m_t_5.t_r.f_12").innerText.includes("niconico");return console.log("Link (idx: "+e+") "+(n?"is niconico":"is original")),n?o.nico=e:o.original=e,n}))}},4871:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getPostMessageFunc=n.fetchNewSongs=n.fetchAllSongs=n.fetchGameVersion=n.fetchPage=n.handleError=n.ALLOWED_ORIGINS=void 0;const r=t(4007),o=t(2847),a=t(868);function c(e){return i(this,void 0,void 0,(function*(){const n=yield fetch(e),t=yield n.text();return(new DOMParser).parseFromString(t,"text/html")}))}function s(e){return i(this,void 0,void 0,(function*(){const n=Array.from(e.querySelectorAll(".w_450.m_15.f_0")),t=[];for(const e of n){const n=a.getSongIdx(e),i=r.getSongName(e),o=r.getChartType(e);let c;"Link"===i&&(c=(yield a.isNicoNicoLink(n))?"Link(nico)":"Link(org)"),t.push({dx:o,name:i,nickname:c})}return t}))}n.ALLOWED_ORIGINS=["https://cdpn.io","https://myjian.github.io","http://localhost:8080"],n.handleError=function(e){alert(e)},n.fetchPage=c,n.fetchGameVersion=function e(n){return i(this,void 0,void 0,(function*(){const t=n.querySelector("select[name=version] option:last-of-type");return t?t.value:e(n=yield c("/maimai-mobile/record/musicVersion/"))}))},n.fetchAllSongs=function(e){return i(this,void 0,void 0,(function*(){if(!e){const n=o.SELF_SCORE_URLS.get("MASTER");e=yield c(n)}return yield s(e)}))},n.fetchNewSongs=function(e){return i(this,void 0,void 0,(function*(){const n=yield c(`/maimai-mobile/record/musicVersion/search/?version=${e}&diff=0`);return yield s(n)}))},n.getPostMessageFunc=function(e,n){return(t,i)=>{const r={action:t,payload:i};e.postMessage(r,n)}}},7471:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r=t(5929),o=t(4007),a=t(1735),c=t(6016),s=t(7377),l=t(4871);!function(e){const n=s.getScriptHost("analyze-friend-rating-in-new-tab")+"/rating-calculator/?",t={zh:{pleaseLogIn:"請登入 maimai NET",analyze:"分析 Rating"},en:{pleaseLogIn:"Please log in to maimai DX NET.",analyze:"Analyze Rating"}}[a.LANG],d={};function u(i){let r=(i.isInVsMode?document:i.elem).querySelector(".analyzeLink");r&&(i.isInVsMode?r.parentElement:r).remove(),r=e.createElement("a"),r.className="analyzeLink f_14",r.style.color="#1477e6",r.target="friendRating",r.innerText=t.analyze;const o=new URLSearchParams({friendIdx:i.idx,playerName:i.name});if(r.href=n+o.toString(),i.isInVsMode){r.className+=" d_ib friend_comment_block t_c",r.style.borderRadius="5px",r.style.width="184px",r.style.marginRight="15px";const e=document.createElement("div");e.className="m_l_10 m_r_10 t_r",e.append(r),i.elem.parentElement.insertAdjacentElement("afterend",e)}else r.className+=" d_b",i.elem.querySelector(".friend_comment_block").insertAdjacentElement("afterbegin",r)}!function(){const n=location.host;if("maimaidx-eng.com"!==n&&"maimaidx.jp"!==n)return void l.handleError(t.pleaseLogIn);if(location.pathname.includes("/friendLevelVs/")||location.pathname.includes("/friendGenreVs/")){const e=document.querySelector(".friend_vs_friend_block"),n=new URLSearchParams(location.search).get("idx"),t={idx:n,name:o.getPlayerName(e),elem:e,isInVsMode:!0};d[n]=t,u(t)}else Array.from(e.querySelectorAll("img.friend_favorite_icon")).map((e=>e.parentElement)).forEach((e=>{const n=e.querySelector("[name=idx]").value,t={idx:n,name:o.getPlayerName(e),elem:e};d[n]=t,u(t)}));let a;window.ratingCalcMsgListener&&window.removeEventListener("message",window.ratingCalcMsgListener),window.ratingCalcMsgListener=e=>{if(console.log(e.origin,e.data),l.ALLOWED_ORIGINS.includes(e.origin)){const n=l.getPostMessageFunc(e.source,e.origin);if("getFriendRecords"===e.data.action){const t=d[e.data.payload];t&&function(e,n){i(this,void 0,void 0,(function*(){const t=yield l.fetchGameVersion(document.body);n("gameVersion",t);const i=o.fetchPlayerGrade(e.elem);i&&n("playerGrade",i);const a=[];for(const t of r.FRIEND_SCORE_URLS.keys())n("appendPlayerScore",c.statusText(t,!1)),yield r.fetchFriendScores(e.idx,t,a),n("appendPlayerScore",c.statusText(t,!0));n("replacePlayerScore",""),n("appendPlayerScore",a.join("\n")),n("calculateRating","")}))}(t,n)}else"fetchNewSongs"===e.data.action?l.fetchNewSongs(e.data.payload).then((e=>n("newSongs",e))):"fetchAllSongs"===e.data.action&&(a&&n("allSongs",a),l.fetchAllSongs().then((e=>{a=e,n("allSongs",e)})))}},window.addEventListener("message",window.ratingCalcMsgListener)}()}(document)}},n={};!function t(i){var r=n[i];if(void 0!==r)return r.exports;var o=n[i]={exports:{}};return e[i].call(o.exports,o,o.exports,t),o.exports}(7471)})();