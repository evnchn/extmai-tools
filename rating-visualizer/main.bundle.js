!function(e){var t={};function a(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=77)}({0:function(e,t){e.exports=React},1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LANG=void 0;const n=new URLSearchParams(document.location.search);let l="en";n.get("hl")?l=n.get("hl").startsWith("zh")?"zh":"en":navigator.language.startsWith("zh")&&(l="zh"),t.LANG=l},7:function(e,t){e.exports=ReactDOM},77:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=n(a(0)),i=n(a(7)),r=a(1),o=a(78);"zh"===r.LANG&&(document.title="maimai DX R 值視覺化互動式網頁"),i.default.render(l.default.createElement(o.RatingVisualizer,null),document.getElementById("root"))},78:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RatingVisualizer=void 0;const l=n(a(0)),i=a(79),r=a(80),o=a(81),s=a(84),c=a(85),m=a(86);class u extends l.default.PureComponent{constructor(e){super(e),this.removeIntervalTimeout=0,this.handleDxPlusChange=e=>{this.setState({isDxPlus:e}),!e&&this.state.maxLv>14&&this.handleUnselectLv()},this.handleChangeHeightUnit=e=>{this.setState({heightUnit:e}),0===e&&this.removeHighlightInterval()},this.handleSelectLv=(e,t,a)=>{this.setState({selectedLvTitle:e,minLv:t,maxLv:a})},this.handleUnselectLv=()=>{this.setState({minLv:void 0,maxLv:void 0,selectedLvTitle:void 0})},this.highlightInterval=(e,t)=>{const a=this.state.highlightInterval;a&&a[0]===e&&a[1]===t?this.removeHighlightInterval():this.setState({highlightInterval:[e,t]})},this.removeHighlightInterval=()=>{console.log("removeInterval"),console.log(document.activeElement),this.removeIntervalTimeout=setTimeout(()=>{this.setState({highlightInterval:void 0}),this.removeIntervalTimeout=0},0)},this.cancelRemoveHighlightInterval=()=>{console.log("cancelRemove"),console.log(document.activeElement),this.removeIntervalTimeout&&(clearTimeout(this.removeIntervalTimeout),this.removeIntervalTimeout=0)},this.state={width:30,heightUnit:8,maxRating:i.DX_MAX_RATING,topPadding:70,isDxPlus:!0,axisLabelStep:5}}render(){const{isDxPlus:e,heightUnit:t,maxRating:a,axisLabelStep:n,highlightInterval:u,minLv:h,selectedLvTitle:v}=this.state,d=this.getLevels(),f=e?i.DX_PLUS_RANKS:i.DX_RANKS,g=this.getContainerHeight(),p=!h;return l.default.createElement("div",{className:"ratingVisualizer"},l.default.createElement(s.OptionsInput,{isDxPlus:e,onChangeDxPlus:this.handleDxPlusChange,onChangeUnit:this.handleChangeHeightUnit,onZoomOut:this.handleUnselectLv,selectedLv:v,minLv:d[d.length-1].title,maxLv:d[0].title,showZoomOutButton:!p,onBlur:this.removeHighlightInterval,onFocus:this.cancelRemoveHighlightInterval}),l.default.createElement("div",{className:"container",onBlur:this.removeHighlightInterval,onFocus:this.cancelRemoveHighlightInterval,tabIndex:-1},l.default.createElement("div",{className:"ratingContainer"},t?l.default.createElement(c.RatingAxis,{maxRating:a,heightUnit:t,containerHeight:g,step:n,onClick:this.removeHighlightInterval}):null,d.map(e=>l.default.createElement(o.LvRatingContainer,{key:e.title,canZoomIn:p,lvTitle:e.title,minLv:e.minLv,maxLv:e.maxLv,heightUnit:t,containerHeight:g,ranks:f,onZoomIn:this.handleSelectLv,highlightInterval:this.highlightInterval})),u&&l.default.createElement(r.IntervalLines,{interval:u,heightUnit:t,onClick:this.removeHighlightInterval}))),l.default.createElement("div",{className:"container"},l.default.createElement(m.RatingTable,{ranks:f,levels:d}),l.default.createElement("footer",{className:"footer"},l.default.createElement("hr",{className:"footerSep"}),l.default.createElement("span",null,"Made by "),l.default.createElement("a",{className:"authorLink",href:"https://github.com/myjian",target:"_blank"},"myjian"),l.default.createElement("span",null,"."))))}getLevels(){const{minLv:e,isDxPlus:t}=this.state;let{maxLv:a}=this.state;if(e&&a){const t=[];for(;e<=a;)t.push({title:a.toFixed(1),minLv:a,maxLv:a}),a-=.1;return t}return t?i.DX_PLUS_LEVELS:i.DX_LEVELS}getContainerHeight(){const{axisLabelStep:e,maxRating:t,heightUnit:a,topPadding:n}=this.state;return(t+e)*a+n}}t.RatingVisualizer=u},79:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DX_LEVELS=t.DX_PLUS_LEVELS=t.DX_PLUS_RANKS=t.DX_RANKS=t.DX_MAX_RATING=void 0,t.DX_MAX_RATING=211,t.DX_RANKS=[{title:"SSS+",minAchv:100.5,rankFactor:15,maxAchv:100.5},{title:"SSS",minAchv:100,rankFactor:14,maxAchv:100.4999},{title:"SS+",minAchv:99.5,rankFactor:13,maxAchv:99.9999,maxRankFactor:13.5},{title:"SS",minAchv:99,rankFactor:12,maxAchv:99.4999},{title:"S+",minAchv:98,rankFactor:11,maxAchv:98.9999},{title:"S",minAchv:97,rankFactor:10,maxAchv:97.9999},{title:"AAA",minAchv:94,rankFactor:9.4,maxAchv:96.9999},{title:"AA",minAchv:90,rankFactor:9,maxAchv:93.99999},{title:"A",minAchv:80,rankFactor:8,maxAchv:89.9999}],t.DX_PLUS_RANKS=[{title:"SSS+",minAchv:100.5,rankFactor:14,maxAchv:100.5},{title:"SSS",minAchv:100,rankFactor:13.5,maxAchv:100.4999},{title:"SS+",minAchv:99.5,rankFactor:13.2,maxAchv:99.9999},{title:"SS",minAchv:99,rankFactor:13,maxAchv:99.4999},{title:"S+",minAchv:98,rankFactor:12.7,maxAchv:98.9999},{title:"S",minAchv:97,rankFactor:12.5,maxAchv:97.9999},{title:"AAA",minAchv:94,rankFactor:10.5,maxAchv:96.9999},{title:"AA",minAchv:90,rankFactor:9.5,maxAchv:93.9999},{title:"A",minAchv:80,rankFactor:8.5,maxAchv:89.9999}];t.DX_PLUS_LEVELS=[{title:"15",minLv:15,maxLv:15},{title:"14+",minLv:14.7,maxLv:14.9},{title:"14",minLv:14,maxLv:14.6},{title:"13+",minLv:13.7,maxLv:13.9},{title:"13",minLv:13,maxLv:13.6},{title:"12+",minLv:12.7,maxLv:12.9},{title:"12",minLv:12,maxLv:12.6},{title:"11+",minLv:11.7,maxLv:11.9},{title:"11",minLv:11,maxLv:11.6},{title:"10+",minLv:10.7,maxLv:10.9},{title:"10",minLv:10,maxLv:10.6},{title:"9+",minLv:9.7,maxLv:9.9},{title:"9",minLv:9,maxLv:9.6},{title:"8+",minLv:8.7,maxLv:8.9},{title:"8",minLv:8,maxLv:8.6}];const n=t.DX_PLUS_LEVELS.slice(2);n[0]={title:"14",minLv:14,maxLv:14},t.DX_LEVELS=n},80:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.IntervalLines=void 0;const l=n(a(0));class i extends l.default.PureComponent{render(){const{interval:e,heightUnit:t,onClick:a}=this.props,n=e[0]===e[1];let i,r;const o={bottom:(i=(e[0]-.5)*t-1)+"px"},s={bottom:(r=(e[1]+.5)*t)+"px"};n?i+=4:r-i<14&&(r+=2,i-=5);const c={bottom:i+"px"},m={bottom:r+"px"};return l.default.createElement("div",{onClick:a},l.default.createElement("div",{className:"intervalBoundary",style:s}),l.default.createElement("div",{className:"intervalBoundary",style:o}),l.default.createElement("div",{className:"intervalLabel",style:c},l.default.createElement("span",{className:"intervalLabelText axisLabelText"},e[0])),!n&&l.default.createElement("div",{className:"intervalLabel",style:m},l.default.createElement("span",{className:"intervalLabelText axisLabelText"},e[1])))}}t.IntervalLines=i},81:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LvRatingContainer=void 0;const l=n(a(0)),i=a(82),r=a(83);class o extends l.default.PureComponent{constructor(){super(...arguments),this.handleLabelClick=()=>{const{lvTitle:e,minLv:t,maxLv:a}=this.props;this.props.onZoomIn(e,t,a)}}render(){const{canZoomIn:e,lvTitle:t,minLv:a,maxLv:n,heightUnit:o,containerHeight:s,ranks:c}=this.props,m={height:s+"px"};return l.default.createElement("div",{className:"lvRatingContainer",style:m},l.default.createElement(i.LvLabel,{title:t,onClick:this.handleLabelClick,canZoomIn:e}),o?c.map(e=>l.default.createElement(r.LvRankRatingSegment,{key:e.title,minLv:a,maxLv:n,minAchv:e.minAchv,maxAchv:e.maxAchv,rankFactor:e.rankFactor,maxRankFactor:e.maxRankFactor,heightUnit:o,title:e.title,highlightInterval:this.props.highlightInterval})):null)}}t.LvRatingContainer=o},82:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LvLabel=void 0;const l=n(a(0));class i extends l.default.PureComponent{render(){const{canZoomIn:e,onClick:t,title:a}=this.props;return l.default.createElement("div",{className:"lvLabel"},l.default.createElement("div",{className:"lvLabelButtonContainer"},l.default.createElement("button",{className:"lvLabelButton",disabled:!e,onClick:t},a)))}}t.LvLabel=i},83:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LvRankRatingSegment=void 0;const l=n(a(0));class i extends l.default.PureComponent{constructor(){super(...arguments),this.minRt=0,this.maxRt=0,this.handleClick=()=>{this.props.highlightInterval(this.minRt,this.maxRt)}}render(){const{minLv:e,minAchv:t,rankFactor:a,maxLv:n,maxAchv:i,maxRankFactor:r,heightUnit:o,title:s}=this.props;this.minRt=Math.floor(e*t*a/100),this.maxRt=Math.floor(n*i*(r||a)/100);const c={bottom:(this.minRt-.5)*o+"px",height:(this.maxRt-this.minRt+1)*o+"px"},m="ratingSegment segment"+s.replace("+","P");return l.default.createElement("div",{className:m,style:c,title:this.hoverText(),tabIndex:0,onClick:this.handleClick},l.default.createElement("div",{className:"ratingSegmentLabel"},s))}hoverText(){return this.minRt<this.maxRt?`${this.minRt} - ${this.maxRt}`:this.maxRt.toString()}}t.LvRankRatingSegment=i},84:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.OptionsInput=void 0;const l=n(a(0));class i extends l.default.PureComponent{constructor(){super(...arguments),this.handleChangeVersion=e=>{console.log(e.target);const t="plus"===e.currentTarget.value;this.props.onChangeDxPlus(t)},this.handleChangeHeightUnit=e=>{console.log(e.target);const t=parseInt(e.currentTarget.value);this.props.onChangeUnit(t)}}render(){const{minLv:e,maxLv:t,selectedLv:a,showZoomOutButton:n,onZoomOut:i,onFocus:r,onBlur:o,isDxPlus:s}=this.props,c=a||`${e} - ${t}`;return l.default.createElement("div",{className:"optionsContainer"},l.default.createElement("div",{className:"container",onFocus:r,onBlur:o,tabIndex:-1},l.default.createElement("label",{className:"optionGroup"},"Game version: ",l.default.createElement("select",{onChange:this.handleChangeVersion},l.default.createElement("option",{value:"dx",selected:!s},"DX"),l.default.createElement("option",{value:"plus",selected:s},"DX+"))),l.default.createElement("label",{className:"optionGroup"},"Scale: ",l.default.createElement("select",{onChange:this.handleChangeHeightUnit},l.default.createElement("option",{value:"0"},"Hide"),l.default.createElement("option",{value:"3"},"3x"),l.default.createElement("option",{value:"4"},"4x"),l.default.createElement("option",{value:"5"},"5x"),l.default.createElement("option",{value:"8",selected:!0},"8x"),l.default.createElement("option",{value:"12"},"12x"))),l.default.createElement("span",{className:"lvRangeLabelContainer"},"Showing Level ",l.default.createElement("span",{className:"lvRangeLabel"},c),n&&l.default.createElement("button",{className:"resetZoomButton",onClick:i},"Reset"))))}}t.OptionsInput=i},85:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RatingAxis=void 0;const l=n(a(0));class i extends l.default.PureComponent{render(){const{step:e,maxRating:t,containerHeight:a,onClick:n}=this.props,i={height:a+"px"},r=[];let o=0;for(o=0;o<t;o+=e)r.push(this.renderLabel(o));return r.push(this.renderLabel(o)),l.default.createElement("div",{className:"axisLabelContainer",style:i,onClick:n},r)}renderLabel(e){const t={bottom:e*this.props.heightUnit+"px"};return l.default.createElement("div",{className:"axisLabel",style:t},l.default.createElement("span",{className:"axisLabelText"},e))}}t.RatingAxis=i},86:function(e,t,a){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.RatingTable=void 0;const l=n(a(0));class i extends l.default.PureComponent{render(){const{levels:e}=this.props;let{ranks:t}=this.props;const a=t.findIndex(e=>"AAA"===e.title);return t=t.slice(0,a+1),l.default.createElement("table",{className:"lookupTable"},l.default.createElement("thead",{className:"lookupTableHead"},l.default.createElement("tr",null,l.default.createElement("th",{className:"lookupTopLeftCell"}),t.map(e=>l.default.createElement("th",null,e.title)))),l.default.createElement("tbody",{className:"lookupTableBody"},e.map(e=>l.default.createElement("tr",null,l.default.createElement("th",null,e.title),t.map(t=>{const a=Math.floor(e.minLv*t.minAchv*t.rankFactor*.01),n=Math.floor(e.maxLv*t.maxAchv*(t.maxRankFactor||t.rankFactor)*.01),i=a===n?a:`${a} - ${n}`;return l.default.createElement("td",null,i)})))))}}t.RatingTable=i}});