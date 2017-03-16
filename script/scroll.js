"use strict";

let $skills = $(".skill_container").find(".skill");
let $proposotionBlocksArray = $(".actions div");

                           /*SCROLLING*/
$(window).on("load", function () {
    let $sections = $(".section");
    let findex = 1;
    $.scrollify({
        section : ".section",
        before:function(i, section) {
            if(i === 1)showSkills();
            if(i === 3)showPropositionToChooseGame($proposotionBlocksArray);
        }
    });
});

$(".scroll").find("img").on("click", function () {
    $.scrollify.next();
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


