!function(e){var n={};function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)t.d(r,c,function(n){return e[n]}.bind(null,c));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=73)}({73:function(e,n,t){"use strict";!function(){const e=["1","2","3","4","5","6","7","7+","8","8+","9","9+","10","10+","11","11+","12","12+","13","13+","14","14+","15"],n=["SSS+","SSS","SS+","SS","S+","S","AAA","AA","A","BBB","BB","B",null],t=["AP+","AP","FC+","FC",null];function r(e,n){const t=new Map;n&&e.reverse();for(const n of e)t.set(n,[]);return n&&e.reverse(),t}function c(e,n,t){let r=[];return e.forEach((e,c)=>{if(e.length){const o=document.createElement("div");o.className="screw_block m_15 f_15",o.innerText=function(e,n,t,r){let c="◖";return c+=e&&n?e+" "+n:e?"NO "+e:n||" --- ",c+"◗　　　"+t+"/"+r}(n,c,e.length,t),r.push(o),r=r.concat(e)}}),r}function o(n,t){const o=r(e,t);return n.forEach(e=>{const n=function(e){return e.getElementsByClassName("music_lv_block")[0].innerText}(e);o.get(n).push(e)}),c(o,"LEVEL",n.length)}function l(e){const n=e.querySelector(".music_score_block.w_120");return n?parseFloat(n.innerText):n}function a(e,n){const t=l(e),r=l(n);return null===t&&null===r?0:null===r?-1:null===t?1:t>r?-1:t<r?1:0}function u(e,t){const o=r(n,t);return e.forEach(e=>{const n=function(e){const n=e.children[0].querySelectorAll("img");if(n.length<5)return null;const t=n[n.length-1].src,r=t.lastIndexOf("_"),c=t.lastIndexOf(".");return t.substring(r+1,c).replace("p","+").toUpperCase()}(e);o.get(n).push(e)}),o.forEach(e=>{e.sort(a),t&&e.reverse()}),c(o,"RANK",e.length)}function s(e,n){const o=r(t,n);return e.forEach(e=>{const n=function(e){const n=e.children[0].querySelectorAll("img");if(n.length<5)return null;const t=n[n.length-2].src,r=t.lastIndexOf("_"),c=t.lastIndexOf("."),o=t.substring(r+1,c);return"back"===o?null:o.replace("ap","AP").replace("p","+").toUpperCase()}(e);o.get(n).push(e)}),c(o,"",e.length)}function i(e,n){const t=document.createElement("option");return t.innerText=e,t.value=n,t}document.querySelectorAll("div.w_450.m_15.p_r.f_0[id]").forEach(e=>{e.style.removeProperty("display"),e.style.removeProperty("margin-top"),e.id.includes("sta_")?e.querySelector(".music_kind_icon_dx").remove():e.querySelector(".music_kind_icon_standard").remove();const n=e.children[1];n.onclick=null,n.className="music_kind_icon"});const d=document.body.querySelector(".main_wrapper.t_c .screw_block");d&&d.insertAdjacentElement("beforebegin",function(){const e="scoreSortContainer";let n=document.getElementById(e);if(n)return n;n=document.createElement("div"),n.id=e,n.className="w_450 m_15";const t=document.createElement("select");return t.className="w_300 m_10",t.addEventListener("change",e=>{!function(e){const n=document.body.querySelectorAll(".main_wrapper.t_c .w_450.m_15.f_0"),t=Array.from(document.body.querySelectorAll(".main_wrapper.t_c .screw_block"));let r=null;switch(e){case"level_des":r=o(n,!0);break;case"level_asc":r=o(n,!1);break;case"rank_des":r=u(n,!1);break;case"rank_asc":r=u(n,!0);break;case"ap_fc_des":r=s(n,!1);break;case"ap_fc_asc":r=s(n,!0);break;default:return}for(let e=1;e<t.length;e++)t[e].remove();const c=t[0];for(let e=r.length-1;e>=1;e--)c.insertAdjacentElement("afterend",r[e]);c.innerText=r[0].innerText}(e.target.value)}),t.appendChild(i("-- Choose Sort Option --","none")),t.appendChild(i("Level (high → low)","level_des")),t.appendChild(i("Level (low → high)","level_asc")),t.appendChild(i("Rank (high → low)","rank_des")),t.appendChild(i("Rank (low → high)","rank_asc")),t.appendChild(i("AP/FC (AP+ → FC)","ap_fc_des")),t.appendChild(i("AP/FC (FC → AP+)","ap_fc_asc")),n.appendChild(t),n}())}()}});