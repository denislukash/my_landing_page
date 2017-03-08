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
    
    $($gameFieldHolder).load("app/lines/index.html #game-area");
    $.getScript("app/lines/lines.js");
    $($rulesContainer).load("app/lines/index.html #lines_rules");

    $.Deferred(function () {
        $($gamesInfo).animate({
            "top" : "96%"
        }, 1500);
        this.resolve()
    }).then(function () {
        setTimeout(()=>{
            $($textinfogames).animate({
               "top" : "100%"
            },2000);
            $($githubInfo).animate({
                "top" : "-8%"
            },2000)
        },5000);
    })
});

$pairsTitleImage.on("click", function () {
    console.log("event!");
    $($gameFieldHolder).load("app/pairs/index.html .holder_pairs");
    $.getScript("app/pairs/script/index.js")
    
});



