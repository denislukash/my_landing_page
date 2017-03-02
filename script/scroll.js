"use strict";

let $header = $("header");

let tempScrollTop, currentScrollTop = 0;

$($header).scroll(function () {

    console.log("scroll!");

    currentScrollTop = $header.scrollTop();

    if(tempScrollTop < currentScrollTop){
        console.log("scroll down!")
    }else if(tempScrollTop > currentScrollTop){
        console.log("scroll up!")
    }

    tempScrollTop = currentScrollTop;
});