!function(e){function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=3)}([function(e,n,t){"use strict";let i=$(".lines_title").find("img"),o=$(".pairs_title").find("img"),r=$(".game-field-container"),a=$(".rules"),s=$(".games_info"),c=$(s).find(".info"),u=$(s).find(".github");i.on("click",function(){$.Deferred(function(){this.resolve()}).then(function(){return $(r).load("app/lines/index.html #game-area").promise()}).then(function(){$.getScript("app/lines/lines.js")}),$(a).load("app/lines/index.html #lines_rules"),$.Deferred(function(){$(s).animate({top:"96%"},1500),this.resolve()}).then(function(){setTimeout(()=>{$(c).animate({top:"100%",opacity:0},2e3),$(u).animate({top:0,opacity:1},2e3)},1e4)})}),o.on("click",function(){$.Deferred(function(){this.resolve()}).then(function(){return $(r).load("app/pairs/index.html .holder_pairs").promise()}).then(function(){$.getScript("app/pairs/script/index.js")}),$(a).load("app/pairs/index.html #pairs_rules")})},function(e,n,t){"use strict";$(window).on("load",function(){let e=$(".name").find("h1"),n=$(".name").find("p"),t=$.Deferred();t.resolve(),t.then(function(){return $(e).animate({left:"25%"},1800,"easeOutBack").promise()}).then(function(){$.fn.animate_Text=function(){var e=this.text();return this.each(function(){var n=$(this);n.html(e.replace(/./g,'<span class="new">$&</span>')),n.find("span.new").each(function(e,n){setTimeout(function(){$(n).addClass("p_opacity")},40*e)})})},$(n).show(),$(n).animate_Text()})})},function(e,n,t){"use strict";function i(){for(let e=0;e<r.length;e++)setTimeout(()=>{$(r[e]).animate({top:"12%",opacity:1},3e3,"easeOutBounce"),$(r[e]).css({display:"block"})},400*e)}function o(e){$.Deferred(function(){this.resolve()}).then(function(){return $(e[0]).animate({opacity:1},1500).promise()}).then(function(){return $(e[1]).animate({opacity:1},1500).promise()}).then(function(){$(e[2]).animate({opacity:1},1500)})}let r=$(".skill_container").find(".skill"),a=$(".actions div");$.superscrollorama({isVertical:!0,triggerAtCenter:!1,playoutAnimations:!0}).pin($("body"),5e3,{anim:(new TimelineLite).append(TweenMax.to($(".skills-block"),.25,{css:{top:0},onComplete:i})).append(TweenMax.to($(".education_block"),.25,{css:{top:0}})).append(TweenMax.to($(".portfolio_block"),.25,{css:{top:0},onComplete:o,onCompleteParams:[a]}))})},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t(1),o=(t.n(i),t(2)),r=(t.n(o),t(0));t.n(r)}]);