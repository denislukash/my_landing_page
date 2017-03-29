"use strict";
let $skillsblock = $(".skills-block");
let $hardskills = $($skillsblock).find(".skill");
let $proposotionBlocksArray = $(".actions div");
let $programmer = $($skillsblock).find(".programmer");

let showAnimation = {
    hardskills: ()=>{
        for(let i = 0; i < $hardskills.length; i++) {
            setTimeout(()=>{
                $($hardskills[i]).animate({
                    opacity : 1
                }, 500);
            }, 500*i)
        }
    },
    propositionToChooseGame: (blockArray)=>{
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
    },
    resume: ()=>{
        $.Deferred(function () {
            this.resolve()
        }).then(function () {
            return $(".resume_image").slideDown(1500).promise()
        }).then(function () {
            $(".download_pdf").animate({
                opacity: 1
            },1000)
        })
    }
};


                           /*SCROLLING*/
$(window).on("load", function () {
    $.scrollify({
        section : ".section",
        before:function(i) {
            if(i === 2)showAnimation.propositionToChooseGame($proposotionBlocksArray);
        },
        scrollSpeed: 1000,
        after: function (i) {
            if(i === 1){
                $.Deferred(function () {
                    this.resolve()
                })
                    .then(function () {
                      return $programmer.animate({
                            top: "10%"
                        },500,'easeOutBack').promise();
                    })
                    .then(function () {
                        showAnimation.hardskills();
                        showAnimation.resume();
                })
            }
        }
    });
});

$(".scroll").find("img").on("click", function () {
    $.scrollify.next();
});

Array.prototype.duplicator = ()=>{
    return this.concat(this);
};
