"use strict";
                        /*CHOOSE GAME*/
let $linesTitleImage = $(".lines_title").find("img");
let $pairsTitleImage = $(".pairs_title").find("img");
let $gameFieldHolder = $(".game-field-container");
let $rulesContainer = $(".rules");
let $gamesInfo = $(".games_info");
let $textinfogames = $($gamesInfo).find(".info");
let $githubInfo = $($gamesInfo).find(".github");

$linesTitleImage.on("click", function () {

    $.Deferred(function () {
        this.resolve();
    }).then(function () {
       return $($gameFieldHolder).load("app/lines/index.html #game-area").promise()
    }).then(function () {
        $.getScript("app/lines/lines.js");
    });
    
    $($rulesContainer).load("app/lines/index.html #lines_rules");

    $.Deferred(function () {
        $($gamesInfo).animate({
            "top" : "96%"
        }, 1500);
        this.resolve()
    }).then(function () {
        setTimeout(()=>{
            $($textinfogames).animate({
               "top" : "100%",
                "opacity" : 0
            },2000);
            $($githubInfo).animate({
                "top" : 0,
                "opacity" : 1
            },2000)
        },10000);
    })
});

$pairsTitleImage.on("click", function () {
    $.Deferred(function () {
        this.resolve()
    }).then(function () {
       return $($gameFieldHolder).load("app/pairs/index.html .holder_pairs").promise()
    }).then(function () {
        $.getScript("app/pairs/script/index.js");
    });
    $($rulesContainer).load("app/pairs/index.html #pairs_rules");
});



