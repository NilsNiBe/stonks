(this.webpackJsonpstonks=this.webpackJsonpstonks||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(5),s=n.n(c),o=(n(11),n(2)),i=n.n(o),u=n(3),p=n(6),l=n.p+"static/media/logo.6ce24c58.svg";n(13);function f(e,t,n){return h.apply(this,arguments)}function h(){return(h=Object(u.a)(i.a.mark((function e(t,n,a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://query1.finance.yahoo.com/v8/finance/chart/".concat(t)+"?region=US&lang=en-US&includePrePost=false&interval=".concat(n,"&range=").concat(a));case 2:if(!(r=e.sent).ok){e.next=7;break}return e.next=6,r.json();case 6:return e.abrupt("return",e.sent);case 7:return e.abrupt("return",void 0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d=n(0);var m=function(){var e=r.a.useState([{symbol:"MSFT",purchase:[{amount:1,time:new Date("2021-05-01T19:00:00")},{amount:2,time:new Date("2021-07-01T19:00:00")},{amount:3,time:new Date("2021-08-01T19:00:00")}]}]),t=Object(p.a)(e,2),n=t[0];t[1];return r.a.useEffect((function(){if(void 0!==n){var e=[];n.forEach((function(t){var n=new Date(Math.min.apply(null,t.purchase.map((function(e){return e.time.getTime()})))),a=function(e,t){var n=Math.abs(e.getTime()-t.getTime());return Math.ceil(n/864e5)}(new Date,n);(function(){var n=Object(u.a)(i.a.mark((function n(){var r;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f(t.symbol,"".concat(a+1,"d"),"1d");case 2:void 0!==(r=n.sent)&&e.push({symbol:t.symbol,res:r});case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}})()()}))}}),[n]),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)("img",{src:l,className:"App-logo",alt:"logo"}),Object(d.jsxs)("p",{children:["Edit ",Object(d.jsx)("code",{children:"src/App.tsx"})," and save to reload."]}),Object(d.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(m,{})}),document.getElementById("root")),b()}},[[15,1,2]]]);
//# sourceMappingURL=main.68e6a8b0.chunk.js.map