(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],[,,,,,,,,,function(t,e,n){},function(t,e,n){},,function(t,e,n){},function(t,e,n){"use strict";n.r(e);var c=n(1),a=n.n(c),r=n(4),i=n.n(r),o=(n(9),n(2)),s=(n(10),n(0)),l=function(t){var e=t.startPlaying;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"BATTLESHIPS"}),Object(s.jsx)("h3",{children:"GAMERULES:"}),Object(s.jsxs)("ol",{className:"rules-list",children:[Object(s.jsx)("li",{children:"Drag and drop your ships into the Player's board"}),Object(s.jsx)("li",{children:"To change ship's direction, click on the ship"}),Object(s.jsx)("li",{children:"Once all ships are in place, press START"}),Object(s.jsx)("li",{children:"To start again press RESTART"})]}),Object(s.jsx)("button",{className:"btn",onClick:e,children:"START"})]})},d=(n(12),function(t){var e=t.shipList,n=Object(c.useState)("-vertical"),a=Object(o.a)(n,2),r=(a[0],a[1],!1),i=function(t){var e=JSON.stringify({size:t.target.value,offsetY:Math.floor((t.clientY-t.target.getBoundingClientRect().top)/40),offsetX:Math.floor((t.clientX-t.target.getBoundingClientRect().left)/40),rotated:r,name:t.target.name});t.dataTransfer.setData("ship",e)};return Object(s.jsx)("div",{className:"ships-container",children:e.map((function(t,e){return Object(s.jsx)("button",{onDragStart:i,draggable:"true",className:t.name,name:t.name,value:t.length,id:t.id,onClick:function(t){return function(t){console.log("id",t.target.id),r=!r,console.log("rotated",r),r?document.getElementById("".concat(t.target.id)).classList.replace("".concat(t.target.name),"".concat(t.target.name,"-vertical")):document.getElementById("".concat(t.target.id)).classList.replace("".concat(t.target.name,"-vertical"),"".concat(t.target.name))}(t)}},e)}))})}),u=[1,2,3,4,5],j=[1,2,3,4,5],h=5,f=5,b=function(t,e){return t+e},O=function(t){var e=t.shipList,n=t.setShipList,a=Object(c.useState)([]),r=Object(o.a)(a,2),i=r[0],l=r[1],O=Object(c.useState)([]),m=Object(o.a)(O,2),p=m[0],g=m[1],v=Object(c.useState)("off"),S=Object(o.a)(v,2),x=S[0],T=S[1],N=Object(c.useState)(""),y=Object(o.a)(N,2),E=y[0],I=y[1],L=Object(c.useState)(""),A=Object(o.a)(L,2),R=A[0],C=A[1],B=Object(c.useState)(""),D=Object(o.a)(B,2),M=D[0],P=D[1],w=Object(c.useState)(!1),k=Object(o.a)(w,2),Y=k[0],U=k[1],K=10,F=0,H=0,J=0,q=[];Object(c.useEffect)((function(){l(new Array(10).fill(0).map((function(){return new Array(K).fill(0)}))),g(new Array(10).fill(0).map((function(){return new Array(K).fill(0)})))}),[]),Object(c.useEffect)((function(){console.log("WHICH TURN IT IS?",E)}),[E]);var W=function(t,c,a){var r=e.filter((function(t){return t.name!==c.name})),o=parseInt(t[0]),s=parseInt(t[2]),l=parseInt(c.size),d=c.rotated,u=parseInt(c.offsetY),j=parseInt(c.offsetX);if(G(o,s,l,i,d,j,u)){for(var h=0;h<l;h++)c.rotated?(i[o-u+h][s]=l,document.getElementById("".concat(o-u+h,",").concat(s)).classList.add("shipdropedColor")):c.rotated||(i[o][s-j+h]=l,document.getElementById("".concat(o,",").concat(s-j+h)).classList.add("shipdropedColor"));n(r),X(l)}else console.log("not valid")},X=function(t){var e=Math.random()<.5;z(t,e)},z=function(t,e){var n=Math.floor(Math.random()*K),c=Math.floor(Math.random()*(K-t-1));e?(F=c,H=n):(F=n,H=c),G(F,H,t,p,e,0,0)?Q(t,e):X(t)},G=function(t,e,n,c,a,r,i){if(a){for(var o=t-i;o<t-i+n;o++)if(o>=K||o<0||0!==c[o][e])return!1;return!0}for(var s=e-r;s<e-r+n;s++)if(s>=K||s<0||0!==c[t][s])return!1;return!0},Q=function(t,e){for(var n=0;n<t;n++)e?p[F+n][H]=t:p[F][H+n]=t;console.log("pc board",p)},V=function t(){var e=Math.floor(Math.random()*K),n=Math.floor(Math.random()*K);"on"===x&&("number"!==typeof i[e][n]?t():0===i[e][n]?(i[e][n]="o",document.getElementById("".concat(e,",").concat(n)).classList.add("missShot"),I("YOUR")):(i[e][n],Z(i[e][n]),i[e][n]="x",document.getElementById("".concat(e,",").concat(n)).classList.add("shipShotColor"),I("YOUR")))},Z=function(t){var e=t-1;j[e]--,0===j[e]&&(console.log("ShipSunk",t),f--,P("".concat(f," TO SINK"))),0===j.reduce(b)&&(console.log("PC WON"),P("".concat(f," LEFT TO SINK, PC HAS DEFEATED YOU!!")),U(!0))},$=function(t,e){var n=t-1;u[n]--,0===u[n]&&(h--,C("".concat(h," TO SINK"))),0===u.reduce(b)&&(C("".concat(h," LEFT TO SINK, YOU WON!!")),U(!0))};return Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("h2",{children:"BATTLESHIP"}),Object(s.jsx)("h3",{children:"Drag your ships to the Player's board and press START!"}),Object(s.jsxs)("div",{className:"all-boards",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("p",{children:"PLAYER BOARD"}),Object(s.jsx)("div",{className:"grid",onDrop:function(t){return function(t){t.preventDefault(),q=JSON.parse(t.dataTransfer.getData("ship"));var e=t.target.id;"square shipdropedColor"!==t.target.className&&W(e,q,t)}(t)},onDragOver:function(t){return function(t){t.preventDefault()}(t)},children:i.map((function(t,e){return Object(s.jsx)("div",{children:t.map((function(t,n){return Object(s.jsx)("div",{className:"square",id:[n,e]},n)}))},e)}))}),Object(s.jsx)("h4",{className:"info",children:M})]}),Object(s.jsxs)("h4",{children:[E," TURN"]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("p",{children:"PC BOARD"}),Object(s.jsx)("div",{className:"grid",children:p.map((function(t,e){return Object(s.jsx)("div",{children:t.map((function(t,n){return Object(s.jsx)("div",{disabled:Y,className:"square",id:J++,onClick:function(t){return function(t,e,n){var c=n.target.id;if("on"===x){if("number"!==typeof p[t][e])return void console.log("not allowed");0===p[t][e]?(p[t][e]="o",document.getElementById("".concat(c)).classList.add("missShot"),I("PC's"),setTimeout((function(){V()}),1e3)):(p[t][e],$(p[t][e],n),p[t][e]="x",document.getElementById("".concat(c)).classList.add("shipShotColor"),0!==u.reduce(b)&&(I("PC's"),setTimeout((function(){V()}),1e3)))}}(n,e,t)}},n)}))},e)}))}),Object(s.jsx)("h4",{className:"info",children:R})]})]}),Object(s.jsx)("button",{className:"btn",onClick:function(t){0===e.length&&(T("on"),I("YOUR"),C("".concat(h," LEFT TO SINK")),P("".concat(f," LEFT TO SINK")))},children:"START"}),Object(s.jsx)("button",{className:"btn",onClick:function(){window.location.reload()},children:"RESTART"}),Object(s.jsx)(d,{shipList:e})]})};var m=function(){var t=Object(c.useState)("welcome"),e=Object(o.a)(t,2),n=e[0],a=e[1],r=Object(c.useState)([{name:"cruiser-container",length:"1",id:"cruiser-container"},{name:"destroyer-container",length:"2",id:"destroyer-container"},{name:"submarine-container",length:"3",id:"submarine-container"},{name:"battleship-container",length:"4",id:"battleship-container"},{name:"carrier-container",length:"5",id:"carrier-container"}]),i=Object(o.a)(r,2),d=i[0],u=i[1];return Object(s.jsx)("div",{className:"App",children:"play"===n?Object(s.jsx)(O,{shipList:d,setShipList:u}):Object(s.jsx)(l,{startPlaying:function(){a("play")}})})};i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(m,{})}),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.79d9ce11.chunk.js.map