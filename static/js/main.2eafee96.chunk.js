(this.webpackJsonpstonks=this.webpackJsonpstonks||[]).push([[0],{119:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),s=n.n(c),i=n(91),o=n(18),u=n.n(o),l=n(35),h=n(22),d=(n(118),n(176)),b=n(163),p=(n(119),n(89)),j=n(178),m=n(165),f=n(166),x=n(17),g=n(177),O=n(90),y=n(75),v=n(180),S="https://corsproxy.cloudno.de",w={chart:"".concat(S,"/https://query2.finance.yahoo.com/v8/finance/chart"),search:"".concat(S,"/https://query2.finance.yahoo.com/v1/finance/search"),quoteSummary:"".concat(S,"/https://query2.finance.yahoo.com/v10/finance/quoteSummary")};function k(e,t,n,a){return C.apply(this,arguments)}function C(){return(C=Object(l.a)(u.a.mark((function e(t,n,a,r){var c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(w.chart,"/").concat(t,"?region=US&lang=en-US")+"&interval=".concat(n,"&period1=").concat(a,"&period2=").concat(r),{headers:{"x-requested-with":"XMLHttpRequest"}});case 2:if(!(c=e.sent).ok){e.next=8;break}return e.next=6,c.json();case 6:return s=e.sent,e.abrupt("return",s);case 8:return e.abrupt("return",void 0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(e){return D.apply(this,arguments)}function D(){return(D=Object(l.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(w.search,"?q=").concat(t,"&quotesCount=10&newsCount=0"),{headers:{"x-requested-with":"XMLHttpRequest"}});case 2:if(!(n=e.sent).ok){e.next=8;break}return e.next=6,n.json();case 6:return a=e.sent,e.abrupt("return",a);case 8:return e.abrupt("return",void 0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){return N.apply(this,arguments)}function N(){return(N=Object(l.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(w.quoteSummary,"/").concat(t,"?modules=financialData"),{headers:{"x-requested-with":"XMLHttpRequest"}});case 2:if(!(n=e.sent).ok){e.next=8;break}return e.next=6,n.json();case 6:return a=e.sent,e.abrupt("return",a);case 8:return e.abrupt("return",void 0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=n(7),T=function(e){var t=r.a.useState([]),n=Object(h.a)(t,2),a=n[0],c=n[1];return Object(L.jsx)(v.a,{id:"combo-box-demo",filterOptions:function(e){return e},options:a,getOptionSelected:function(e,t){return e.symbol===t.symbol},getOptionLabel:function(e){return"".concat(e.symbol," - ").concat(e.longName)},onInputChange:function(){var t=Object(l.a)(u.a.mark((function t(n,a,r){var s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("input"!==r){t.next=9;break}if(""!==a){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,q(a);case 5:void 0!==(s=t.sent)&&c(s.quotes.map((function(e){return{symbol:e.symbol,longName:e.longname}}))),t.next=10;break;case 9:"clear"===r&&(c([]),e.setSymbol(""));case 10:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}(),onClose:function(t,n){if("select-option"===n){var r=t.target.textContent,c=a.find((function(e){return"".concat(e.symbol," - ").concat(e.longName)===r}));void 0!==c&&e.setSymbol(c.symbol)}},renderInput:function(e){return Object(L.jsx)(j.a,Object(y.a)(Object(y.a)({},e),{},{label:"Wertpapier",variant:"outlined"}))}})},I=function(e){var t=r.a.useState(new Date),n=Object(h.a)(t,2),a=n[0],c=n[1],s=r.a.useState(""),i=Object(h.a)(s,2),o=i[0],u=i[1],l=r.a.useState(1),d=Object(h.a)(l,2),y=d[0],v=d[1];return Object(L.jsx)(x.a,{utils:p.a,children:Object(L.jsxs)(b.a,{container:!0,justifyContent:"center",direction:"row",spacing:1,style:{padding:5,margin:5,backgroundColor:"white",borderRadius:5,boxShadow:"1px 1px 1px gray"},children:[Object(L.jsx)(b.a,{item:!0,lg:3,md:3,sm:4,xs:12,children:Object(L.jsx)(g.a,{format:"dd.MM.yyyy",id:"date-picker-dialog",label:"Kaufzeitpunkt",inputVariant:"outlined",value:a,onChange:function(e,t){if(t){var n=Object(O.a)(t,"dd.MM.yyyy",new Date);!function(e){c(e)}(n<new Date?n:new Date)}},KeyboardButtonProps:{"aria-label":"change date"}})}),Object(L.jsx)(b.a,{item:!0,lg:6,md:6,sm:8,xs:12,children:Object(L.jsx)(T,{symbol:o,setSymbol:u})}),Object(L.jsx)(b.a,{item:!0,lg:2,md:2,sm:4,xs:12,children:Object(L.jsx)(j.a,{id:"standard-number",label:"Anzahl",type:"number",variant:"outlined",defaultValue:1,value:y,InputLabelProps:{shrink:!0},onChange:function(e){var t=Number(e.target.value);isNaN(t)||v(t)}})}),Object(L.jsx)(b.a,{item:!0,lg:1,md:1,sm:8,xs:12,children:Object(L.jsx)(m.a,{color:"primary","aria-label":"add",size:"medium",children:Object(L.jsx)(f.a,{onClick:function(){return e.returnShare(a,o,y)}})})})]})})},P=n(175),F=n(160),E=n(172),R=n(173),z=n(167),B=n(168),U=n(174),V=n(164),A=n(162),J=n(171),H=n(179),K=n(169),W=n(170);function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return"".concat(e.toFixed(t)," %")}var G=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}),Q=Object(V.a)({root:{"& > *":{borderBottom:"unset"}}}),Y=function(e){var t=r.a.useState(!1),n=Object(h.a)(t,2),a=n[0],c=n[1],s=Q(),i=e.row;return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsxs)(z.a,{className:s.root,children:[Object(L.jsx)(B.a,{children:Object(L.jsx)(A.a,{"aria-label":"expand row",size:"small",onClick:function(){return c(!a)},children:a?Object(L.jsx)(K.a,{}):Object(L.jsx)(W.a,{})})}),Object(L.jsx)(B.a,{component:"th",scope:"row",children:i.name}),Object(L.jsx)(B.a,{align:"right",children:i.shareCount}),Object(L.jsx)(B.a,{align:"right",children:G.format(i.shareValue)}),Object(L.jsx)(B.a,{align:"right",children:G.format(i.closeToday)}),Object(L.jsx)(B.a,{align:"right",style:{color:-1===Math.sign(i.percentChangeToday)?"red":"green"},children:X(i.percentChangeToday)})]}),Object(L.jsx)(z.a,{children:Object(L.jsx)(B.a,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:Object(L.jsx)(J.a,{in:a,timeout:"auto",unmountOnExit:!0,children:Object(L.jsx)(H.a,{margin:1,children:Object(L.jsxs)(E.a,{size:"small","aria-label":"purchases",children:[Object(L.jsx)(R.a,{children:Object(L.jsxs)(z.a,{children:[Object(L.jsx)(B.a,{children:"Datum"}),Object(L.jsx)(B.a,{children:"Menge"}),Object(L.jsx)(B.a,{align:"right",children:"Kaufpreis"})]})}),Object(L.jsx)(U.a,{children:i.rowPurchases.map((function(e){return Object(L.jsxs)(z.a,{children:[Object(L.jsx)(B.a,{component:"th",scope:"row",children:new Date(e.timeStamp).toLocaleDateString()}),Object(L.jsx)(B.a,{children:e.amount}),Object(L.jsx)(B.a,{align:"right",children:G.format(e.buyPrice)})]},e.timeStamp)}))})]})})})})})]})};function Z(e,t){var n=function(e,t){for(var n=e.length;n>=0;n--)if(e[n]<=t)return n;return 0}(t.timestamp,e/1e3);return t.indicators.quote[0].close[n]}var $=function(e){var t=void 0===e.chartDataList?[]:e.shares.map((function(t){return function(e,t){var n=e.symbol,a=t.find((function(t){return t.symbol===e.symbol})).res.chart.result[0],r=a.indicators.quote[0],c=r.close[r.close.length-1],s=r.open[r.open.length-1],i=(c-s)/s*100,o=e.purchases.map((function(e){return e.amount})).reduce((function(e,t){return e+t}));return{name:n,shareCount:o,closeToday:c,percentChangeToday:i,shareValue:o*c,rowPurchases:e.purchases.map((function(e){return{timeStamp:e.timeStamp,amount:e.amount,buyPrice:Z(e.timeStamp,a)}}))}}(t,e.chartDataList)}));return Object(L.jsx)(P.a,{component:F.a,children:Object(L.jsxs)(E.a,{"aria-label":"collapsible table",padding:"checkbox",children:[Object(L.jsx)(R.a,{children:Object(L.jsxs)(z.a,{children:[Object(L.jsx)(B.a,{}),Object(L.jsx)(B.a,{children:"Aktie"}),Object(L.jsx)(B.a,{align:"right",children:"Menge"}),Object(L.jsx)(B.a,{align:"right",children:"Wert"}),Object(L.jsx)(B.a,{align:"right",children:"Preis"}),Object(L.jsx)(B.a,{align:"right",children:"G/V"})]})}),Object(L.jsx)(U.a,{children:t.map((function(e){return Object(L.jsx)(Y,{row:e},e.name)}))})]})})},_=n.p+"static/media/stonks.6d058a2d.jpg";function ee(e){return Math.floor(e/1e3)}var te=function(){var e=r.a.useState(function(){var e=localStorage.getItem("nibeshares");return e?JSON.parse(e):[]}()),t=Object(h.a)(e,2),n=t[0],a=t[1],c=r.a.useState(),s=Object(h.a)(c,2),o=s[0],p=s[1];r.a.useEffect((function(){localStorage.setItem("stonks",JSON.stringify(n))}),[n]),r.a.useEffect((function(){if(void 0!==n){var e=[];(function(){var t=Object(l.a)(u.a.mark((function t(){var a,r,c,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<n.length)){t.next=11;break}return r=Math.min.apply(null,n[a].purchases.map((function(e){return e.timeStamp}))),c=(new Date).getTime(),t.next=6,k(n[a].symbol,"1d",ee(r),ee(c));case 6:void 0!==(s=t.sent)&&e.push({symbol:n[a].symbol,res:s});case 8:a++,t.next=1;break;case 11:p(e);case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}}),[n]);var j={width:"100%",height:"400px",backgroundImage:"url(".concat(_,")")};return Object(L.jsx)("div",{className:"App",children:Object(L.jsx)("header",{className:"App-header",style:j,children:Object(L.jsx)("section",{style:{margin:40},children:Object(L.jsx)(d.a,{maxWidth:"md",children:Object(L.jsxs)(b.a,{container:!0,style:{backgroundColor:"lightskyblue",padding:20,borderRadius:5,boxShadow:"1px 1px 1px gray"},children:[Object(L.jsx)(I,{returnShare:function(){var e=Object(l.a)(u.a.mark((function e(t,r,c){var s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==r){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,M(r);case 4:if(!(void 0===(s=e.sent)||s.quoteSummary.result===[]||null===s.quoteSummary.result||c<=0)){e.next=7;break}return e.abrupt("return");case 7:void 0!==(o=n.find((function(e){return e.symbol.toUpperCase()===r.toUpperCase()})))?o.purchases.push({timeStamp:t.getTime(),amount:c}):n.push({symbol:r,purchases:[{timeStamp:t.getTime(),amount:c}]}),a(Object(i.a)(n));case 10:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()}),void 0!==o&&o.length===n.length&&Object(L.jsx)($,{shares:n,chartDataList:o})]})})})})})},ne=(n(127),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))});s.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(te,{})}),document.getElementById("root")),ne()}},[[128,1,2]]]);
//# sourceMappingURL=main.2eafee96.chunk.js.map