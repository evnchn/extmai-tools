(()=>{"use strict";var e={8608:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.fetchFriendScores=n.FRIEND_SCORE_URLS=void 0;const r=t(2347),o=t(6420);n.FRIEND_SCORE_URLS=new Map([["Re:MASTER","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=4&idx="],["MASTER","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=3&idx="],["EXPERT","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=2&idx="],["ADVANCED","/maimai-mobile/friend/friendGenreVs/battleStart/?scoreType=2&genre=99&diff=1&idx="]]),n.fetchFriendScores=function(e,t,a){return i(this,void 0,void 0,(function*(){let i=n.FRIEND_SCORE_URLS.get(t);if(!i)return;i+=e;const c=(yield(0,o.fetchPage)(i)).querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:a};c.forEach((e=>function(e,n,t){const i=e.classList.contains("screw_block"),o=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_3")&&e.classList.contains("f_0");if(i)t.genre=e.innerText;else if(o){const i=(0,r.getSongName)(e),o=(0,r.getChartLevel)(e),a=1===(0,r.getChartType)(e)?"DX":"STANDARD",c=function(e){const n=e.querySelector("td.w_120.f_b:last-child"),t=n&&n.innerText.trim();return"0"!==t&&"― %"!==t?t:null}(e);if(!c)return;t.scoreList.push([i,t.genre,n,o,a,c].join("\t"))}}(e,t,s)))}))}},2347:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.getPlayerGrade=n.getPlayerName=n.getChartType=n.getChartDifficulty=n.getChartLevel=n.getSongName=void 0;const i=t(472);n.getSongName=function(e){return(0,i.normalizeSongName)(e.getElementsByClassName("music_name_block")[0].innerText)},n.getChartLevel=function(e){return e.getElementsByClassName("music_lv_block")[0].innerText},n.getChartDifficulty=function(e){if(!e.classList.contains("pointer")){const n=e.querySelector(".pointer");e=n||e}const n=e.className.match(/music_([a-z]+)_score_back/)[1].toUpperCase();return 0===n.indexOf("RE")?"Re:MASTER":n},n.getChartType=function(e){return e.id?e.id.includes("sta_")?0:1:e.querySelector("img:nth-child(2)").src.includes("_standard")?0:1},n.getPlayerName=function(e){var n,t;return e.className.includes("friend_vs_friend_block")?null===(n=e.querySelector(".t_l"))||void 0===n?void 0:n.innerText:null===(t=e.querySelector(".name_block"))||void 0===t?void 0:t.innerText},n.getPlayerGrade=function(e){const n=e.querySelector(".user_data_block_line ~ img.h_25");if(n){const e=n.src.lastIndexOf("grade_");return n.src.substring(e+6,e+8)}return null}},6510:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.fetchScores=n.SELF_SCORE_URLS=void 0;const r=t(2347),o=t(6420);n.SELF_SCORE_URLS={"Re:MASTER":"/maimai-mobile/record/musicGenre/search/?genre=99&diff=4",MASTER:"/maimai-mobile/record/musicGenre/search/?genre=99&diff=3",EXPERT:"/maimai-mobile/record/musicGenre/search/?genre=99&diff=2",ADVANCED:"/maimai-mobile/record/musicGenre/search/?genre=99&diff=1"},n.fetchScores=function(e,t){return i(this,void 0,void 0,(function*(){const i=n.SELF_SCORE_URLS[e];if(!i)return;const a=yield(0,o.fetchPage)(i),c=a.querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:t};return c.forEach((n=>function(e,n,t){const i=e.classList.contains("screw_block"),o=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_r")&&e.classList.contains("f_0");if(i)t.genre=e.innerText;else if(o){const i=(0,r.getSongName)(e),o=(0,r.getChartLevel)(e),a=1===(0,r.getChartType)(e)?"DX":"STANDARD",c=function(e){const n=e.querySelector(".music_score_block.w_120");return n&&n.innerText}(e);if(!c)return;t.scoreList.push([i,t.genre,n,o,a,c].join("\t"))}}(n,e,s))),a}))}},8080:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.getInitialLanguage=n.saveLanguage=n.SUPPORTED_LANGUAGES=void 0,n.SUPPORTED_LANGUAGES=["en_US","zh_TW"];const t="MaiToolsLang";n.saveLanguage=function(e){window.localStorage.setItem(t,e)},n.getInitialLanguage=function(){const e=new URLSearchParams(location.search);return function(){switch(window.localStorage.getItem(t)){case"en_US":return"en_US";case"zh_TW":return"zh_TW"}return null}()||(e.get("hl")?e.get("hl").startsWith("zh")?"zh_TW":"en_US":navigator.language.startsWith("zh")?"zh_TW":"en_US")}},4468:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.statusText=void 0;const t={zh_TW:{advStart:"匯入黃譜成績中…",advDone:"✔",expStart:"匯入紅譜成績中…",expDone:"✔",masStart:"匯入紫譜成績中…",masDone:"✔",remStart:"匯入白譜成績中…",remDone:"✔"},en_US:{advStart:"Loading Advanced scores…",advDone:"✔",expStart:"Loading Expert scores…",expDone:"✔",masStart:"Loading Master scores…",masDone:"✔",remStart:"Loading Re:Master scores…",remDone:"✔"}};n.statusText=function(e,n,i){const r=t[e];switch(n){case"Re:MASTER":return i?r.remDone+"\n":r.remStart;case"MASTER":return i?r.masDone+"\n":r.masStart;case"EXPERT":return i?r.expDone+"\n":r.expStart;case"ADVANCED":return i?r.advDone+"\n":r.advStart}return""}},4313:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.getScriptHost=void 0,n.getScriptHost=function(e){const n=Array.from(document.querySelectorAll("script"));for(;n.length;){const t=n.pop();if(t.src.includes(e)){const e=new URL(t.src),n=e.pathname;return e.origin+n.substring(0,n.lastIndexOf("/scripts"))}}return"https://myjian.github.io/mai-tools"}},472:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.isNicoNicoLink=n.getSongNickname=n.getSongIdx=n.normalizeSongName=n.RATING_TARGET_SONG_NAME_PREFIX=n.DX_SONG_NAME_SUFFIX=void 0;const r=t(6420);n.DX_SONG_NAME_SUFFIX=" [DX]",n.RATING_TARGET_SONG_NAME_PREFIX="▶ ",n.normalizeSongName=function(e){return"D✪N’T  ST✪P  R✪CKIN’"===e?"D✪N’T ST✪P R✪CKIN’":e.replace(/" \+ '/g,"").replace(/' \+ "/g,"")},n.getSongIdx=function(e){return e.getElementsByTagName("form")[0].elements.namedItem("idx").value},n.getSongNickname=function(e,t,i){return"Link"===e&&(e=t.includes("niconico")?"Link(nico)":"Link(org)"),1===i?e+n.DX_SONG_NAME_SUFFIX:e};let o={};n.isNicoNicoLink=function(e){return i(this,void 0,void 0,(function*(){if(o.nico===e)return!0;if(o.original===e)return!1;const n=(yield(0,r.fetchPage)("/maimai-mobile/record/musicDetail/?"+new URLSearchParams([["idx",e]]).toString())).body.querySelector(".m_10.m_t_5.t_r.f_12").innerText.includes("niconico");return console.log("Link (idx: "+e+") "+(n?"is niconico":"is original")),n?o.nico=e:o.original=e,n}))}},6420:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.getPostMessageFunc=n.fetchNewSongs=n.fetchAllSongs=n.fetchGameVersion=n.fetchPage=n.handleError=n.ALLOWED_ORIGINS=void 0;const r=t(2347),o=t(6510),a=t(472);function c(e){return i(this,void 0,void 0,(function*(){const n=yield fetch(e),t=yield n.text();return(new DOMParser).parseFromString(t,"text/html")}))}function s(e){return i(this,void 0,void 0,(function*(){const n=Array.from(e.querySelectorAll(".w_450.m_15.f_0")),t=[];for(const e of n){const n=(0,a.getSongIdx)(e),i=(0,r.getSongName)(e),o=(0,r.getChartType)(e);let c;"Link"===i&&(c=(yield(0,a.isNicoNicoLink)(n))?"Link(nico)":"Link(org)"),t.push({dx:o,name:i,nickname:c})}return t}))}n.ALLOWED_ORIGINS=["https://cdpn.io","https://myjian.github.io","http://localhost:8080"],n.handleError=function(e){alert(e)},n.fetchPage=c,n.fetchGameVersion=function e(n){return i(this,void 0,void 0,(function*(){const t=n.querySelector("select[name=version] option:last-of-type");return t?parseInt(t.value):e(n=yield c("/maimai-mobile/record/musicVersion/"))}))},n.fetchAllSongs=function(e){return i(this,void 0,void 0,(function*(){if(!e){const n=o.SELF_SCORE_URLS.MASTER;e=yield c(n)}return yield s(e)}))},n.fetchNewSongs=function(e){return i(this,void 0,void 0,(function*(){const n=yield c(`/maimai-mobile/record/musicVersion/search/?version=${e}&diff=0`);return yield s(n)}))},n.getPostMessageFunc=function(e,n){return(t,i)=>{const r={action:t,payload:i};e.postMessage(r,n)}}},6898:function(e,n,t){var i=this&&this.__awaiter||function(e,n,t,i){return new(t||(t=Promise))((function(r,o){function a(e){try{s(i.next(e))}catch(e){o(e)}}function c(e){try{s(i.throw(e))}catch(e){o(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,c)}s((i=i.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r=t(8608),o=t(2347),a=t(8080),c=t(4468),s=t(4313),l=t(6420);!function(e){const n=(0,s.getScriptHost)("analyze-friend-rating-in-new-tab")+"/rating-calculator/?";let t=(0,a.getInitialLanguage)();const u={zh_TW:{pleaseLogIn:"請登入 maimai NET",analyze:"分析 Rating"},en_US:{pleaseLogIn:"Please log in to maimai DX NET.",analyze:"Analyze Rating"}}[t],d={};function f(t,i){let r=(2===t.page?document:i).querySelector(".analyzeLink");r&&(2===t.page?r.parentElement:r).remove(),r=e.createElement("a"),r.className="analyzeLink f_14",r.style.color="#1477e6",r.target="friendRating",r.innerText=u.analyze;const o=new URLSearchParams({friendIdx:t.idx,playerName:t.name});if(r.href=n+o.toString(),2===t.page){r.className+=" d_ib friend_comment_block t_c",r.style.borderRadius="5px",r.style.width="184px",r.style.marginRight="15px";const e=document.createElement("div");e.className="m_l_10 m_r_10 t_r",e.append(r),i.parentElement.insertAdjacentElement("afterend",e)}else r.className+=" d_b",i.querySelector(0===t.page?".friend_comment_block":".comment_block").insertAdjacentElement("afterbegin",r)}!function(){const n=location.host;if("maimaidx-eng.com"!==n&&"maimaidx.jp"!==n)return void(0,l.handleError)(u.pleaseLogIn);if(location.pathname.includes("/friendLevelVs/")||location.pathname.includes("/friendGenreVs/")){const e=document.querySelector(".friend_vs_friend_block"),n=new URLSearchParams(location.search).get("idx"),t={idx:n,name:(0,o.getPlayerName)(e),grade:"",page:2};d[n]=t,f(t,e)}else if(location.pathname.includes("/friend/friendDetail/")){const e=document.querySelector(".see_through_block"),n=new URLSearchParams(location.search).get("idx"),t={idx:n,name:(0,o.getPlayerName)(e),grade:(0,o.getPlayerGrade)(e),page:1};d[n]=t,f(t,e)}else Array.from(e.querySelectorAll("img.friend_favorite_icon")).map((e=>e.parentElement)).forEach((e=>{const n=e.querySelector("[name=idx]").value,t={idx:n,name:(0,o.getPlayerName)(e),grade:(0,o.getPlayerGrade)(e),page:0};d[n]=t,f(t,e)}));let s;const g=(0,l.fetchGameVersion)(document.body);window.ratingCalcMsgListener&&window.removeEventListener("message",window.ratingCalcMsgListener),window.ratingCalcMsgListener=e=>i(this,void 0,void 0,(function*(){if(console.log(e.origin,e.data),l.ALLOWED_ORIGINS.includes(e.origin)){const n=(0,l.getPostMessageFunc)(e.source,e.origin);if("object"!=typeof e.data)return;if("getFriendRecords"===e.data.action){n("gameVersion",yield g);const o=d[e.data.payload];o&&function(e,n){i(this,void 0,void 0,(function*(){e.grade&&n("playerGrade",e.grade);const i=[];for(const o of r.FRIEND_SCORE_URLS.keys())n("appendPlayerScore",(0,c.statusText)(t,o,!1)),yield(0,r.fetchFriendScores)(e.idx,o,i),n("appendPlayerScore",(0,c.statusText)(t,o,!0));n("replacePlayerScore",""),n("appendPlayerScore",i.join("\n")),n("calculateRating","")}))}(o,n)}else if("fetchNewSongs"===e.data.action){const t=yield g,i=e.data.payload;t<i?n("newSongs",[]):(0,l.fetchNewSongs)(i).then((e=>n("newSongs",e)))}else"fetchAllSongs"===e.data.action?(s&&n("allSongs",s),(0,l.fetchAllSongs)().then((e=>{s=e,n("allSongs",e)}))):"saveLanguage"===e.data.action&&(t=e.data.payload,(0,a.saveLanguage)(t))}})),window.addEventListener("message",window.ratingCalcMsgListener)}()}(document)}},n={};!function t(i){var r=n[i];if(void 0!==r)return r.exports;var o=n[i]={exports:{}};return e[i].call(o.exports,o,o.exports,t),o.exports}(6898)})();