var pairs=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="./build/",t(t.s=11)}({11:function(e,t,n){"use strict";function r(e){var t=this;t._count=e,t.startCountdown=(()=>{return t._count++}),t.reset=(e=>{t._count=e})}function i(e){var t=document.createElement("table");t.setAttribute("id","game-field");for(let n=0;n<e.height;n++){let n=document.createElement("tr");t.appendChild(n);for(let r=0;r<e.width;r++){let e=document.createElement("td"),t=document.createElement("div"),r=document.createElement("div"),i=document.createElement("div");r.classList.add(y),r.setAttribute("hidden",""),i.classList.add(E),e.appendChild(t),e.appendChild(i),e.appendChild(r),n.appendChild(e)}}return t}function o(e){for(let t=0;t<w.height;t++){let n=S.rows[t];for(let r=0;r<w.width;r++){let t=n.cells[r].firstChild;e(t)}}}function c(e,t){var n=e.slice(),r=t.width*t.height/2;switch(!0){case r<=8:return n.length=r,n.concat(n);case r>=8&&r<=16:var i=n.concat(n);return i.length=i.length-(i.length-r),i.concat(i);case r>=16&&r<=32:var o=n.concat(n).concat(n).concat(n);return o.length=o.length-(o.length-r),o.concat(o)}}function u(e,t){return parseInt(Math.random()*(t-e)+e)}function l(e,t){return u(-2,2)}function a(){o(e=>{e.classList.add(O.shift()),e.setAttribute("hidden","")})}function s(){k.setAttribute("hidden",""),document.querySelector(".play_button_container > h1").innerText="PLAY AGAIN",L=setInterval(()=>{_.innerText=A.startCountdown()},1e3),q=setInterval(()=>{I.innerText=b.startReversCountdown(b)},1e3),S.addEventListener("click",f),P.removeEventListener("click",s),P.addEventListener("click",d)}function d(){A.reset(0),b.reset(1e3),S.remove(),O=c(C,w).sort(l),S=i(w),document.querySelector(".game_container").appendChild(S),a(),s()}function f(e){var t=e.target,n=e.target.previousSibling;t.hasAttribute("class")&&!t.classList.contains(y)&&(G.isArrayFull(j)&&(h(),j.splice(0,j.length)),F.openImage(n),o(e=>{G.is2cellOpen()&&G.cellIsOpen(e)&&j.unshift(e.getAttribute("class"))}),G.isArrayFull(j)&&G.isImageSame(j)&&(m(),G.isGameEnd()&&p()))}function h(){o(e=>{G.cellIsOpen(e)&&F.closeImage(e)})}function m(){o(e=>{G.cellIsOpen(e)&&F.deleteImage(e)})}function p(){clearInterval(L),clearInterval(q),k.removeAttribute("hidden"),S.removeEventListener("click",f)}Object.defineProperty(t,"__esModule",{value:!0});var v=n(4),g=(n.n(v),n(3)),b=(n.n(g),new r(1e3)),A=new r(0);b.__proto__.startReversCountdown=(e=>{return e._count--});var I=document.querySelector("#score"),_=document.querySelector("#time"),E="close",y="delete",w={width:4,height:4},S=i(w);document.querySelector(".game_container").appendChild(S);var C=[];for(let x=1;x<9;x++){let e="image-"+x;C.push(e)}var O=c(C,w).sort(l);a();var L,q,k=document.querySelector(".play_button_container"),P=document.querySelector("#start_button");P.addEventListener("click",s);var j=[],F={openImage:e=>{e.removeAttribute("hidden"),e.setAttribute("open",""),e.nextElementSibling.setAttribute("hidden","")},closeImage:e=>{e.setAttribute("hidden",""),e.removeAttribute("open"),e.nextElementSibling.removeAttribute("hidden")},deleteImage:e=>{e.setAttribute("hidden",""),e.setAttribute("delete",""),e.removeAttribute("open"),e.nextElementSibling.nextElementSibling.removeAttribute("hidden")}},G={cellIsOpen:e=>{return e.hasAttribute("open")},isImageSame:e=>{return e[0]===e[1]},isArrayFull:e=>{return 2===e.length},is2cellOpen:()=>{var e=[];return o(t=>{G.cellIsOpen(t)&&e.unshift(t.getAttribute("class"))}),2===e.length},isGameEnd:()=>{for(let e=0;e<w.height;e++){var t=S.rows[e];for(let n=0;n<w.width;n++){let e=t.cells[n].firstChild;if(!e.hasAttribute("delete"))return!1}}return!0}}},3:function(e,t){},4:function(e,t){}});