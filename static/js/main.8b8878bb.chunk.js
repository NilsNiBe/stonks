(this.webpackJsonpstonks=this.webpackJsonpstonks||[]).push([[0],{47:function(e,t,n){},49:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(10),i=n.n(c),s=(n(47),n(16)),o=n.n(s),u=n(20),l=n(30);n(49);function j(e,t,n,a){return h.apply(this,arguments)}function h(){return(h=Object(u.a)(o.a.mark((function e(t,n,a,r){var c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://corsproxy.cloudno.de/https://query2.finance.yahoo.com/v8/finance/chart/".concat(t)+"?region=US&lang=en-US&interval=".concat(n,"&period1=").concat(a,"&period2=").concat(r),{headers:{"X-Requested-With":"XMLHttpRequest"}});case 2:if(!(c=e.sent).ok){e.next=9;break}return e.next=6,c.json();case 6:return i=e.sent,console.log(i),e.abrupt("return",i);case 9:return e.abrupt("return",void 0);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(50);var m=n(85),d=n(86),b=n(82),p=n(93),x=n(95),O=n(94),g=n(88),f=n(90),v=n(84),y=n(91),S=n(89),w=n(83),T=n(87),k=n(92),D=n(2);function C(e){return Math.floor(e.getTime()/1e3)}var P=function(){var e=r.a.useState([{symbol:"MSFT",purchases:[{amount:1,timeStamp:C(new Date("2021-05-01T19:00:00"))},{amount:2,timeStamp:C(new Date("2021-07-01T19:00:00"))},{amount:3,timeStamp:C(new Date("2021-08-01T19:00:00"))}]},{symbol:"GOOGL",purchases:[{amount:1,timeStamp:C(new Date("2021-05-01T19:00:00"))},{amount:2,timeStamp:C(new Date("2021-07-01T19:00:00"))},{amount:3,timeStamp:C(new Date("2021-08-01T19:00:00"))}]}]),t=Object(l.a)(e,2),n=t[0],a=(t[1],r.a.useState()),c=Object(l.a)(a,2),i=c[0],s=c[1];r.a.useEffect((function(){if(void 0!==n){var e=[];(function(){var t=Object(u.a)(o.a.mark((function t(){var a,r,c,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=0;case 1:if(!(a<n.length)){t.next=11;break}return r=Math.min.apply(null,n[a].purchases.map((function(e){return e.timeStamp}))),c=C(new Date),t.next=6,j(n[a].symbol,"1d",r,c);case 6:void 0!==(i=t.sent)&&e.push({symbol:n[a].symbol,res:i});case 8:a++,t.next=1;break;case 11:s(e);case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}}),[n]);var h=Object(b.a)({root:{"& > *":{borderBottom:"unset"}}});function P(e,t){var n=function(e,t){for(var n=0;n<e.length;n++)if(e[n]<=t)return n;return-1}(t.timestamp,e);return t.indicators.quote[0].close[n]}function F(e){var t=r.a.useState(!1),n=Object(l.a)(t,2),a=n[0],c=n[1],i=h(),s=e.row;return Object(D.jsxs)(r.a.Fragment,{children:[Object(D.jsxs)(w.a,{className:i.root,children:[Object(D.jsx)(v.a,{children:Object(D.jsx)(O.a,{"aria-label":"expand row",size:"small",onClick:function(){return c(!a)},children:a?Object(D.jsx)(m.a,{}):Object(D.jsx)(d.a,{})})}),Object(D.jsx)(v.a,{component:"th",scope:"row",children:s.name}),Object(D.jsx)(v.a,{align:"right",children:s.shareCount}),Object(D.jsx)(v.a,{align:"right",children:s.shareValue}),Object(D.jsx)(v.a,{align:"right",children:s.closeToday}),Object(D.jsx)(v.a,{align:"right",children:s.percentChangeToday})]}),Object(D.jsx)(w.a,{children:Object(D.jsx)(v.a,{style:{paddingBottom:0,paddingTop:0},colSpan:6,children:Object(D.jsx)(x.a,{in:a,timeout:"auto",unmountOnExit:!0,children:Object(D.jsxs)(p.a,{margin:1,children:[Object(D.jsx)(T.a,{variant:"h6",gutterBottom:!0,component:"div",children:"History"}),Object(D.jsxs)(g.a,{size:"small","aria-label":"purchases",children:[Object(D.jsx)(S.a,{children:Object(D.jsxs)(w.a,{children:[Object(D.jsx)(v.a,{children:"Datum"}),Object(D.jsx)(v.a,{children:"Menge"}),Object(D.jsx)(v.a,{align:"right",children:"Preis"})]})}),Object(D.jsx)(f.a,{children:s.rowPurchases.map((function(e){return Object(D.jsxs)(w.a,{children:[Object(D.jsx)(v.a,{component:"th",scope:"row",children:new Date(e.timeStamp).toDateString()}),Object(D.jsx)(v.a,{children:e.amount}),Object(D.jsx)(v.a,{align:"right",children:e.buyPrice})]},e.timeStamp)}))})]})]})})})})]})}return Object(D.jsx)("div",{className:"App",children:Object(D.jsx)("header",{className:"App-header",children:Object(D.jsx)(D.Fragment,{children:void 0!==i&&function(){var e=void 0===i?[]:n.map((function(e){return function(e,t){var n=e.symbol,a=t.find((function(t){return t.symbol===e.symbol})).res.chart.result[0],r=a.indicators.quote[0],c=r.close[r.close.length-1],i=r.open[r.open.length-1],s=(c-i)/i,o=e.purchases.map((function(e){return e.amount})).reduce((function(e,t){return e+t}));return{name:n,shareCount:o,closeToday:c,percentChangeToday:s,shareValue:o*c,rowPurchases:e.purchases.map((function(e){return{timeStamp:e.timeStamp,amount:e.amount,buyPrice:P(e.timeStamp,a)}}))}}(e,i)}));return Object(D.jsx)(y.a,{component:k.a,children:Object(D.jsxs)(g.a,{"aria-label":"collapsible table",children:[Object(D.jsx)(S.a,{children:Object(D.jsxs)(w.a,{children:[Object(D.jsx)(v.a,{}),Object(D.jsx)(v.a,{children:"Aktie"}),Object(D.jsx)(v.a,{align:"right",children:"Menge"}),Object(D.jsx)(v.a,{align:"right",children:"Wert"}),Object(D.jsx)(v.a,{align:"right",children:"Preis"}),Object(D.jsx)(v.a,{align:"right",children:"Tages\xe4nderung"})]})}),Object(D.jsx)(f.a,{children:e.map((function(e){return Object(D.jsx)(F,{row:e},e.name)}))})]})})}()})})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,98)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(D.jsx)(r.a.StrictMode,{children:Object(D.jsx)(P,{})}),document.getElementById("root")),F()}},[[56,1,2]]]);
//# sourceMappingURL=main.8b8878bb.chunk.js.map