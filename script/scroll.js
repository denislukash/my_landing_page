"use strict";

let $skills = $(".skill_container").find(".skill");
let $proposotionBlocksArray = $(".actions div");

                           /*SLIDER*/
let controller = $.superscrollorama({
    isVertical: true,
    triggerAtCenter: false,
    playoutAnimations: true
});

let scrollDuration = 5000;

controller.pin($("body"), scrollDuration, {
    anim: (new TimelineLite())
        .append(
            TweenMax.to($(".skills-block"), 5, {css:{top: 0}, onComplete: showSkills})
        )
        .append(
            TweenMax.to($(".education_block"), 5, {css:{top:0}})
        )
        .append(
            TweenMax.to($(".portfolio_block"), 5, {css:{top:0}, onComplete: showPropositionToChooseGame, onCompleteParams: [$proposotionBlocksArray]})
        )
});

function showSkills() {

    for(let i = 0; i < $skills.length; i++) {
        setTimeout(()=>{
            $($skills[i]).animate({
                top : "12%",
                opacity : 1
            }, 3000, "easeOutBounce");
            $($skills[i]).css({
                display : "block"
            })
        }, 300*i)
    }
}

function showPropositionToChooseGame(blockArray) {
     $.Deferred(function () {
        this.resolve();
    }).then(function () {
        return $(blockArray[0]).animate({
            "opacity" : 1
        },1500).promise()
    }).then(function () {
        return $(blockArray[1]).animate({
            "opacity" : 1
        },1500).promise()
    }).then(function () {
        $(blockArray[2]).animate({
            "opacity" : 1
        },1500)
    })
}


