"use strict";

let $skills = $(".skill_container").find(".skill");
let showSkillsParam = {top: "15%", opacity: 1, duration: 1000};
let showSkills = skills.bind(showSkillsParam);
let $proposotionBlocksArray = $(".actions div")
console.log($proposotionBlocksArray);

                           /*SLIDER*/
let controller = $.superscrollorama({
    isVertical: true,
    triggerAtCenter: false,
    playoutAnimations: true
});

let scrollDuration = 3500;

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

                        /*SKILLS*/

function skills() {

    for(let i = 0; i < $skills.length; i++) {
        setTimeout(()=>{
            $($skills[i]).animate({
                top : this.top,
                opacity : this.opacity
            }, this.duration, "easeOutBounce")
        }, 600*i)
    }
}

function showPropositionToChooseGame(blockArray) {
    console.log(blockArray);
     $.Deferred(function () {
        this.resolve();
    }).then(function () {
        return $(blockArray[0]).animate({
            "opacity" : 1
        },2000).promise()
    }).then(function () {
        return $(blockArray[1]).animate({
            "opacity" : 1
        },2000).promise()
    }).then(function () {
        $(blockArray[2]).animate({
            "opacity" : 1
        },2000)
    })
}


