(()=>{"use strict";var e={8320:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.performLocalization=void 0,t.performLocalization=function(){const e=document.getElementById("analyze"),t=document.getElementById("convert"),n=document.getElementById("resetLink"),o=document.getElementById("chartInfoHeading"),a=document.getElementById("howtoHeading"),i=document.getElementById("description"),r=document.getElementById("bookmarklet"),c=document.getElementById("sampleInputs"),d=document.getElementsByClassName("totalNoteCount")[0];navigator.language.startsWith("zh")?(document.title="譜面資訊",a.innerText="使用方式",o.innerText="譜面資訊",r.innerText="換算 maimai DX 成績為舊版分數",e.innerText="分析",t.innerText="換算成舊版分數",c.innerText="範例輸入",d.innerText="總計",n.innerText="重新輸入",i.innerText=`\n使用方式一：自動代入成績\n1. 把網頁下方的連結加入書籤\n2. 登入 maimai DX NET，打開一個最近打過的歌曲成績\n3. 使用書籤\n4. 點擊「點我分析分數」\n5. 分數資料會自動匯入\n\n使用方式二：手動貼上成績 (僅限電腦版)\n1. 登入 maimai DX net，打開一個最近打過的歌曲成績\n2. 全選並用 Ctrl+C 複製\n3. 貼到上面的文字欄。\n4. 按下「${t.innerText}」或「${e.innerText}」\n`):i.innerText=`\nMethod 1: automatic import\n1. Create a bookmarklet from the link below.\n2. Log in to maimai DX NET, and open a recently played song score page.\n3. Use the bookmarklet. (Accept pop-up window if being asked.)\n4. This page shall open with score data imported.\n\nMethod 2: manually paste score\n1. Log in to maimai DX NET, and open a recently played song score page.\n2. Select all and copy with Ctrl-C.\n3. Paste the content into the text area at the top of this page.\n4. Click "${t.innerText}" or "${e.innerText}".\n`}}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{const e=n(8320);!function(){(0,e.performLocalization)();const t={tap:500,hold:1e3,touch:500,slide:1500,break:2500},n=["tap","hold","slide","break"],o=["tap","hold","slide","touch","break"],a=document.querySelector(".input"),i=document.getElementById("analyze"),r=document.getElementById("convert"),c=[0,0,0,0,0];function d(e){return e.trim().replace(/\s+/g,"-")}function l(e,t){const n=e.match(/\d+/g);return n?n.map((e=>parseInt(e,10))):t}function s(e,t){const n=a.value.split("\n");if(n.length<6)return;let i,r,c=[];for(;n.length;){const e=n.pop(),t=e.match(/\d+/g);if(0===c.length&&t&&t.length>=4&&t.length<=5){c.unshift(e);for(let e=0;e<o.length-1;e++)c.unshift(n.pop())}const a=e.match(/(\d+\.\d+)%/);if(a){r=a[1],i=n.pop();break}}if(i&&r&&c.length){t.set("st",i),t.set("ac",r),t.set("nd",c.map(d).join("_"));const n=e+"?"+t;console.log(n),window.location.assign(n)}}i.addEventListener("click",(()=>{s(document.location.origin+document.location.pathname,new URLSearchParams)})),r.addEventListener("click",(()=>{s("../classic-layout/",new URLSearchParams({gameVersion:"10"}))}));const m=new URLSearchParams(document.location.search);let u=!0;if(m.get("st")&&m.get("ac")&&m.get("nd")){const e=m.get("st"),a=m.get("ac"),i=m.get("nd");e&&a&&i&&(document.title=`${e} - ${document.title}`,function(e,a,i){if(!isNaN(a)&&i.length>=4){const a=document.getElementById("songTitle");a.innerText=e||"",a.href="https://maimai.fandom.com/zh/wiki/"+encodeURIComponent(e)+"?variant=zh-hant";const r=4===i.length?n:o,c=new Map;i.forEach(((e,t)=>{c.set(r[t],e)}));const d={tap:0,hold:0,slide:0,touch:0,break:0},l=o.reduce(((e,t)=>{const n=(c.get(t)||[]).reduce(((e,t)=>e+t),0);return d[t]=n,"touch"===t&&document.querySelector(".touchRow").classList[0===n?"add":"remove"]("hidden"),document.getElementById(`${t}Count`).innerText=n.toString(),e+n}),0);document.getElementById("totalNoteCount").innerText=l.toString();const[s,m]=function(e){let n=0;for(const a of o)e[a]&&(n+=e[a]*t[a]);const a=new Map,i=5e4/n,r=1/e.break;a.set("tap",i),a.set("hold",2*i),a.set("slide",3*i),a.set("touch",i),a.set("breakDx",5*i+r),a.set("break",5.2*i);let c=1e4*e.break/n;return c=Math.floor(100*c)/100,c+=100,[a,c]}(d);s.forEach(((e,t)=>{let n;switch(t=t.charAt(0).toUpperCase()+t.substring(1)){case"Break":n=document.getElementById("finalePctPerBreak"),n.innerText+=e.toFixed(2);break;case"BreakDx":n=document.getElementById("dxPctPerBreak"),n.innerText=e.toFixed(4);break;default:n=document.getElementById("pctPer"+t),n.innerText=e.toFixed(2)}n.innerText+="%"})),document.getElementById("finaleMaxAchv").innerText=m.toFixed(2)+"%"}}(e,parseFloat(a),function(e){let t=e.split("_");t.length<5&&(t=e.split("\n"));const n=l(t.pop(),void 0),o=c.slice(0,n.length),a=l(t.pop(),void 0),i=l(t.pop(),o),r=l(t.pop(),o),d=[l(t.pop(),o),r,i,n];return a&&d.splice(3,0,a),d}(i)),u=!1)}document.getElementById("resetLink").classList[u?"add":"remove"]("hidden"),document.getElementById("inputContainer").classList[u?"remove":"add"]("hidden")}()})()})();