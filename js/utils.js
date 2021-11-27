function createMat(rowsLength, collsLength) {
    var board = []
    for (var i = 0; i < rowsLength; i++) {
        board[i] = []
        for (var j = 0; j < collsLength; j++) {
            var gCell = createCell(i, j);
            board[i][j] = gCell;
        }
    }
    //console.table(board);
    return board;
}

function drawNum() {
    var numsArr = createNums()
    shuffle(numsArr)
    var randomNum = numsArr[0]
    return randomNum
}

function shuffle(items) {
    var randIdx;
    var keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomIntInclusive(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


