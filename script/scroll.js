"use strict";

let $skills = $(".skill_container").find(".skill");
let showSkills = {top: "25%", opacity: 1, duration: 2000};
let show = skills.bind(showSkills);
// let hideSkills = {top: "-200%", opacity: 0, duration: 100};
                           /*SLIDER*/
let controller = $.superscrollorama({
    isVertical: true,
    triggerAtCenter: false,
    playoutAnimations: true
});

controller.pin($("body"), 1500, {
    anim: (new TimelineLite())
        .append(
            TweenMax.to($(".skills-block"), 4, {css:{top: 0}})
        )
        .append(
            TweenMax.to($(".education_block"), 4, {css:{top:0}})
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
        }, 800*i)
    }
}

