"use strict";
import "./less/balls.less";
import "./less/settingsmenu.less";
import "./less/style.less";

function SimilarChain(chainLength, comparatorFn, onChainFilledFn) {
    let lastItem = null;
    let itemChain = [];

    this.push = function (item) {
        if (!comparatorFn(lastItem, item)) {
            itemChain = [];
        }

        itemChain.push(item);
        lastItem = item;

        let isFulfilled = itemChain.length >= chainLength;

        if (isFulfilled) {
            onChainFilledFn(itemChain);
        }

        return isFulfilled;
    };
}

var field_height = 9;
var field_width = 9;

function getMatrix(height, width) {
    var arr=[];

    for (var row = 0; row < height; row++){
        arr[row] = [];

        for (var column = 0; column < width; column++){
            arr[row][column] = {};
        }
    }
    return arr;
}

function createFieldOnHTML(matrix) {
    var table = document.createElement("table");
    table.setAttribute("id", "game-matrix");

    matrix.forEach((row, rowIndex) => {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        row.forEach((cell, cellIndex) => {
            let td = document.createElement("td");
            let ball = document.createElement("div");
            td.appendChild(ball);
            tr.appendChild(td);
            ball.classList.add("ball");
            dataAtribute.setY(rowIndex)(ball);
            dataAtribute.setX(cellIndex)(ball);
        })
    });
    return table;
}

let dataAtribute = {
    getY: (elem) => {return elem.getAttribute("data-y")},
    setY: (value) => {return (elem) => {elem.dataset.y = value}},
    setX: (value) => {return (elem) => {elem.dataset.x = value}},
    getX: (elem) => {return elem.getAttribute("data-x")}
};

Object.prototype.toString = () => {return ""};

let matrix = getMatrix(field_height, field_width);
let parentOfGame_matrix = document.getElementById("game-field");

parentOfGame_matrix.appendChild( createFieldOnHTML(matrix) );
document.getElementById("game-area").classList.add("field9x9");

let table = document.getElementById("game-matrix");


function stepCounter() {
    var count = 0;

    return function (step) {
        return count += step;
    }
}


function setCountersToZero() {
    counterForPoints = stepCounter();
    counterForSteps = stepCounter();
    points.innerText = 0;
    steps.innerText = 0;
}

function calculatePoints(quantity) {
    let arr = [
        {from: 4,to: 5, modifier: 2},
        {from: 6, to: 7, modifier: 3},
        {from: 8, to: 9, modifier: 4},
        {from: 10, to: 11, modifier: 5}
    ];

    for(let i = 0; i < arr.length; i++){
        if(quantity == arr[i].from || quantity == arr[i].to){
            return quantity*arr[i].modifier;
        }
    }

    return 0;
}
var counterForSteps = stepCounter();
var counterForPoints = stepCounter();
var steps = document.getElementById("step");
var points = document.getElementById("score");

const FIELD_7X7 = "field7x7";
const FIELD_9X9 = "field9x9";
const FIELD_11X11 = "field11x11";

function displayNextBallArea() {
    document.getElementById("next_ball_area").classList.toggle("hidden");
}

document.getElementById("checkbox1").addEventListener("click", displayNextBallArea);

function swapField() {
    matrix = getMatrix(field_height, field_width);
    table.remove();
    parentOfGame_matrix.appendChild( createFieldOnHTML(matrix) );
    table = document.getElementById("game-matrix");
}

function clearClassField() {
    game_area.classList.remove(FIELD_7X7);
    game_area.classList.remove(FIELD_9X9);
    game_area.classList.remove(FIELD_11X11);
}

function setRandomBallsSettings() {
    firstRandom = getNextRandomBallArray(quantityOfRandomBalls);
    addRandomBallToField(firstRandom);
    nextRandom = getNextRandomBallArray(quantityOfRandomBalls);
    nextBalls.set_delete(nextRandom);
}

function applySettings(obj) {
    if(obj.field !== ""){
        clearClassField();
        game_area.classList.add(obj.field);
        if(obj.field === FIELD_7X7)settings.f7x7();
        if(obj.field === FIELD_9X9)settings.f9x9();
        if(obj.field === FIELD_11X11)settings.f11x11();
        nextBalls.set_delete(nextRandom);
        setRandomBallsSettings();
    }
}

let winSettings = {
    gameParamWindow: () => {return document.getElementById("game_parameters")},
    open: () => {winSettings.gameParamWindow().style.display = "table"},
    close: () => {winSettings.gameParamWindow().style.display = "none"}
};

let settings = {
    f7x7: () =>{
        field_height = 7;
        field_width = 7;
        swapField();
        quantityOfDeleteBalls = 3;
        quantityOfRandomBalls = 2;
    },
    f9x9: () =>{
        field_height = 9;
        field_width = 9;
        swapField();
        quantityOfDeleteBalls = 4;
        quantityOfRandomBalls = 3;
    },
    f11x11: () => {
        field_height = 11;
        field_width = 11;
        swapField();
        quantityOfDeleteBalls = 5;
        quantityOfRandomBalls = 4;
    }
};

let game_area = document.getElementById("game-area");

document.querySelector(".button_new").addEventListener("click", (event) => {
    swapField();
    nextBalls.set_delete(nextRandom);
    setRandomBallsSettings();
});

document.querySelector(".button_sett").addEventListener("click", winSettings.open);

document.querySelector(".confirm_button").addEventListener("click", (event) => {
    var form = document.forms["settings_form"];
    var settings_info = {};
    settings_info.field = form.elements["field_size"].value;

    event.preventDefault();
    winSettings.close();

    applySettings(settings_info);
    setCountersToZero();
});

document.querySelector(".cancel_button").addEventListener("click", (event) => {
    winSettings.close();
    event.preventDefault();
});

function ballCompare(ball1, ball2) {
    const color1 = (ball1 instanceof CreateBallObject) ? ball1.color : NaN;
    const color2 = (ball2 instanceof CreateBallObject) ? ball2.color : NaN;

    return color1 === color2;
}

function findSameColorBallsInRow(minBallsCount) {
    matrix.forEach(function (row, rowIndex) {
        let similarBallsInRowChain = new SimilarChain(minBallsCount, ballCompare, markBallsForDelete);

        row.forEach(function (cell, cellIndex) {
            similarBallsInRowChain.push(matrix[rowIndex][cellIndex]);
        });
    });
}

function findSameColorBallsInColumn(minBallsCount) {
    matrix.forEach(function (row, rowIndex) {
        let similarBallsInRowChain = new SimilarChain(minBallsCount, ballCompare, markBallsForDelete);

        row.forEach(function (cell, cellIndex) {
            similarBallsInRowChain.push(matrix[cellIndex][rowIndex]);
        });
    });
}

function deleteSameColorBall() {
    var del = false;
    var deletedBallsCount = 0;
    matrix.forEach((row, rowIndex) => {

        row.forEach((cell, cellIndex) => {
            if (matrix[rowIndex][cellIndex].hasOwnProperty("delete")) {
                deleteBallFromField(rowIndex, cellIndex);
                matrix[rowIndex][cellIndex] = {};
                del = true;
                deletedBallsCount++;
            }
        })
    });
    points.innerText = counterForPoints(calculatePoints(deletedBallsCount));

    return del;
}

function markBallsForDelete(ballsArray) {
    ballsArray.forEach((ball) => {
        ball.delete = "ok"
    });
}

let picked = "picked";
let unpicked = "unpicked";

function CreateBallObject(color) {
    this.color = color;
    this.status = unpicked;
}

CreateBallObject.prototype.pick_ball = function (elem) {
    elem.classList.add("animation");
    this.status = picked;
};

CreateBallObject.prototype.unpick_ball = function (elem) {
    elem.classList.remove("animation");
    this.status = unpicked;
};

let quantityOfDeleteBalls = 4;
let quantityOfRandomBalls = 3;
let firstRandom;
let nextRandom;

function addBallToFieldFromMatrix(y, x) {
    getBallElement(y, x).classList.add(matrix[y][x].color);
}

function getBallElement(row, column) {
    var rows = table.rows[row];
    var cell = rows.cells[column];
    return cell.firstChild;
}

function getNextRandomBallArray(count) {
    var arr = [];

    for(var i = 0; i < count; i++){
        arr[i] = new CreateBallObject( random.getColor() );
    }
    return arr;
}

function addRandomBallToField(array) {

    for (var i = 0; i < array.length; i++){
        var randomForMatrixRow =  random.getInteger(0, matrix.length);
        var randomForMatrixColumn = random.getInteger(0, matrix.length);

        if( check.cellIsEmpty(randomForMatrixRow, randomForMatrixColumn) ){
            matrix[randomForMatrixRow][randomForMatrixColumn] = array[i];
            addBallToFieldFromMatrix(randomForMatrixRow, randomForMatrixColumn);
        }else{
            --i;
        }
    }
    findSameColorBallsInRow(quantityOfDeleteBalls);
    findSameColorBallsInColumn(quantityOfDeleteBalls);
    setTimeout(deleteSameColorBall,500);
}



var check = {
    cellIsEmpty: (y, x) => {return !matrix[y][x].hasOwnProperty("color")},
    ballIsPicked: (y, x) => {return matrix[y][x].status === picked},
    thereIsPickedBallsOnField: () => {
        let result = false;
        matrix.forEach((row, rowIndex) => {

            matrix[rowIndex].forEach((cell, cellIndex) => {
                if(check.ballIsPicked(rowIndex, cellIndex)){
                    result = true;
                }
            })
        });
        return result
    }
};

var random = {
    getColor: () => {
        var color = ["red", "yellow", "green", "dark_blue", "pink", "blue", "dark"];
        var index = random.getInteger(0, color.length);
        return color[index];
    },
    getInteger: (min, max) => {return parseInt(Math.random() * (max - min) + min)}
};

var nextBalls = {
    get_element_collection: () => {
        return document.querySelectorAll(".next_ball");
    },
    set_delete: (array) => {
        array.forEach((element, index) => {
            nextBalls.get_element_collection()[index].classList.toggle(array[index].color);
        })
    }
};

setRandomBallsSettings();

function deleteBallFromField(y, x) {
    getBallElement(y, x).classList.remove("animation");
    getBallElement(y, x).classList.remove(matrix[y][x].color);
}


var ball = {
    pick: (elem, y, x) => {matrix[y][x].pick_ball(elem)},
    unpickAllPicked: function () {
        matrix.forEach((row, rowIndex) => {

            row.forEach((cell, cellIndex) => {
                if(check.ballIsPicked(rowIndex, cellIndex)){
                    cell.unpick_ball(getBallElement(rowIndex, cellIndex))
                }
            })
        })},
    findAndDeletePicked: function () {
        let color;

        matrix.forEach((row, rowIndex) => {

            row.forEach((cell, cellIndex) => {
                if (check.ballIsPicked(rowIndex, cellIndex)){
                    color = cell.color;
                    deleteBallFromField(rowIndex, cellIndex);
                    matrix[rowIndex][cellIndex] = {};
                }
            })
        });
        return color;
    }
};

var tableParent = document.getElementById("game-field");

tableParent.addEventListener("click", function (event) {
    var target = event.target;

    var x = dataAtribute.getX(target);
    var y = dataAtribute.getY(target);

    if(!check.cellIsEmpty(y, x) && !check.ballIsPicked(y, x)){
        ball.unpickAllPicked();
        ball.pick(target, y, x);
    }
});

tableParent.addEventListener("click", function (event) {
    var target = event.target;

    var x = dataAtribute.getX(target);
    var y = dataAtribute.getY(target);

    if( check.cellIsEmpty(y, x) && check.thereIsPickedBallsOnField()) {
        var color = ball.findAndDeletePicked();

        matrix[y][x] = new CreateBallObject(color);
        addBallToFieldFromMatrix(y, x);

        steps.textContent = counterForSteps(1);

        findSameColorBallsInRow(quantityOfDeleteBalls);
        findSameColorBallsInColumn(quantityOfDeleteBalls);

        setTimeout(function () {
            if (deleteSameColorBall())return;
            addRandomBallToField(nextRandom);
            nextBalls.set_delete(nextRandom);
            nextRandom = getNextRandomBallArray(quantityOfRandomBalls);
            nextBalls.set_delete(nextRandom);
        }, 500);
    }
});
