"use strict";

import "../css/style.less";
import "../css/image.less";

function Counter(startCountValue) {

    var self = this;

    self._count = startCountValue;

    self.startCountdown = () => {
        return self._count++;
    };

    self.reset = (startCountValue) => {
        self._count = startCountValue;
    }
}

var scoreCounter = new Counter(1000);
var timeCounter = new Counter(0);

scoreCounter.__proto__.startReversCountdown = (self) => {
    return self._count--;
};

var score = document.querySelector("#score");
var time = document.querySelector("#time");

var CLOSED_PICTURE_CLASS = "close";
var DELETE_PICTURE_CLASS = "delete";

var fieldSize = {width: 4, height: 4};

//build table for field, each cell - image
function createFieldOnHTML(settings) {
    var table = document.createElement("table");
    table.setAttribute("id", "game-field");

    for(let i = 0; i < settings.height; i++){
        let tr = document.createElement("tr");
        table.appendChild(tr);

        for(let j = 0; j < settings.width; j++){
            let td = document.createElement("td");

            let image = document.createElement("div"); //div with image
            let del = document.createElement("div"); //div with deleted image
            let closed = document.createElement("div"); //div with hidden image

            del.classList.add(DELETE_PICTURE_CLASS);
            del.setAttribute("hidden", "");

            closed.classList.add(CLOSED_PICTURE_CLASS);

            td.appendChild(image);
            td.appendChild(closed);
            td.appendChild(del);
            tr.appendChild(td);
        }
    }
    return table;
}

var table = createFieldOnHTML(fieldSize);

document.querySelector(".game_container").appendChild(table);

var imageQuantity = 9;
var imagesClasses = [];

//fill all classes of image to array
for(let i = 1; i < imageQuantity; i++){
    let className = "image-" + i;
    imagesClasses.push(className);
}

function forEachCell(callBackFN) { //you can do something with each cell in table

    for(let i = 0; i < fieldSize.height; i++){
        let rows = table.rows[i];

        for(let j = 0; j < fieldSize.width; j++){
            let cell = rows.cells[j].firstChild;

            callBackFN(cell);
        }
    }
}

function getArrayWithImageObject(classArray, settings) {

    var intermediateArray = classArray.slice();

    var quantityUniqImage = settings.width*settings.height/2;
    //I cut all possible quantity of images for 3 groups, for each group - own calculation formula of class in array
    switch (true) {
        case quantityUniqImage <= 8:
            intermediateArray.length = quantityUniqImage;
            return intermediateArray.concat(intermediateArray);

        case quantityUniqImage >= 8 && quantityUniqImage <= 16:
            var arr = intermediateArray.concat(intermediateArray);
            arr.length = arr.length - (arr.length - quantityUniqImage);
            return arr.concat(arr);

        case quantityUniqImage >= 16 && quantityUniqImage <= 32:
            var arr2 = intermediateArray.concat(intermediateArray).concat(intermediateArray).concat(intermediateArray);
            arr2.length = arr2.length - (arr2.length - quantityUniqImage);
            return arr2.concat(arr2);
    }
}

function getRandomInteger(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function randomSortComparatorFn(a, b) {
    return getRandomInteger(-2, 2);
}

function placeImagesToField() {
    forEachCell((cell) =>{
        cell.classList.add(images.shift()); // add random image and delete it from array
        cell.setAttribute("hidden", "");//in result, when free calls end, array.length be 0
    });
}
//get random sorted array with images className
var images = getArrayWithImageObject(imagesClasses, fieldSize).sort(randomSortComparatorFn);

placeImagesToField();

var timeIntervalID;
var scoreIntervalID;

var playButtonContainer =  document.querySelector(".play_button_container");
var playButton = document.querySelector("#start_button");

playButton.addEventListener("click", startGame);

function startGame() {

    playButtonContainer.setAttribute("hidden", "");

    document.querySelector(".play_button_container > h1").innerText = "PLAY AGAIN";

    timeIntervalID = setInterval(() => {
        time.innerText = timeCounter.startCountdown();
    }, 1000);

    scoreIntervalID = setInterval(() => {
        score.innerText = scoreCounter.startReversCountdown(scoreCounter);
    }, 1000);

    table.addEventListener("click", game);

    playButton.removeEventListener("click", startGame);
    playButton.addEventListener("click", startNewGame);
}

function startNewGame() {

    timeCounter.reset(0);
    scoreCounter.reset(1000);

    table.remove();

    images = getArrayWithImageObject(imagesClasses, fieldSize).sort(randomSortComparatorFn);

    table = createFieldOnHTML(fieldSize);

    document.querySelector(".game_container").appendChild(table);

    placeImagesToField();

    startGame();
}

var openImageArray = [];

function game(e) {
    var target = e.target;
    var img = e.target.previousSibling;
    //if click on td or on deleted image - do nothing
    if(!target.hasAttribute("class") || target.classList.contains(DELETE_PICTURE_CLASS))return;
    //if already 2 image open - close them
    if(check.isArrayFull(openImageArray)){
        closeDifferentImages();
        openImageArray.splice(0, openImageArray.length);
    }

    display.openImage(img); //open image

    forEachCell((cell) => {
        if(check.is2cellOpen() && check.cellIsOpen(cell)){ //if 2 cell open and current image open to
            openImageArray.unshift(cell.getAttribute("class"));//push open classes to array for compare
        }
    });
    //if array has 2 classes, compare them and delete if same
    if(check.isArrayFull(openImageArray) && check.isImageSame(openImageArray)) {
        deleteSameImage();
        if(check.isGameEnd())endGame();
    }
}

function closeDifferentImages() {

    forEachCell((cell) => {
        if(check.cellIsOpen(cell)){
            display.closeImage(cell);
        }
    })
}

function deleteSameImage() {
    forEachCell((cell) => {

        if(check.cellIsOpen(cell)){
            display.deleteImage(cell);
        }
    })
}

function endGame() {
    clearInterval(timeIntervalID);
    clearInterval(scoreIntervalID);
    playButtonContainer.removeAttribute("hidden");
    table.removeEventListener("click", game);
}


var display = {
    openImage: (imageElemDIV) => {
        imageElemDIV.removeAttribute("hidden");
        imageElemDIV.setAttribute("open", "");
        imageElemDIV.nextElementSibling.setAttribute("hidden", "");
    },
    closeImage: (imageElementDIV) => {
        imageElementDIV.setAttribute("hidden", "");
        imageElementDIV.removeAttribute("open");
        imageElementDIV.nextElementSibling.removeAttribute("hidden");
    },
    deleteImage: (imageElementDIV) => {
        imageElementDIV.setAttribute("hidden", "");
        imageElementDIV.setAttribute("delete", "");
        imageElementDIV.removeAttribute("open");
        imageElementDIV.nextElementSibling.nextElementSibling.removeAttribute("hidden");
    }
};

var check = {
    cellIsOpen: (cell) => { return cell.hasAttribute("open") },
    isImageSame: (array) => { return array[0] === array[1]; },
    isArrayFull: (array) => { return array.length === 2 },
    is2cellOpen: () => {
        var x = [];
        forEachCell((cell) => {
            if(check.cellIsOpen(cell)){
                x.unshift(cell.getAttribute("class"));
            }
        });
        return x.length === 2
    },
    isGameEnd: () => {

        for(let i = 0; i < fieldSize.height; i++){
            var rows = table.rows[i];

            for(let j = 0; j < fieldSize.width; j++){
                let cell = rows.cells[j].firstChild;

                if(!cell.hasAttribute("delete")) return false;
            }
        }
        return true;
    }
};