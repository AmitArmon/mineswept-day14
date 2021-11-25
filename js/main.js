'use strict'

const BOMB = '💣'
const EMPTY = ' ';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gCell = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}

var elBoard;

function initGame() {
    gBoard = buildBoard();
    console.table(gBoard);
    renderMat(gBoard, '.board');
}

function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE);

    board[0][0] = BOMB;
    board[2][0] = BOMB;


    return board;
}

function createMat(rowsLength, collsLength) {
    var board = []
    for (var i = 0; i < rowsLength; i++) {
        board[i] = []
        for (var j = 0; j < collsLength; j++) {
            var gCell = {
                value: EMPTY,
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = gCell;
        }
    }
    console.log(board);
    return board;
}

function renderMat(mat, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            setMinesNegsCount(i, j);
            cell = setMinesNegsCount(i, j)
            var className = 'cell cell' + i + '-' + j;
            strHTML += `<td class="cell${className}" 
            onclick="cellClicked()">
            ${cell}
            </td>`
            // '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elBoardntainer = document.querySelector(selector);
    elBoardntainer.innerHTML = strHTML;
}

function setMinesNegsCount(rowIdx, colIdx) {
    var minesNegsCounter = EMPTY;
    var cell = gBoard[rowIdx][colIdx]
    if (cell === BOMB) return BOMB;
    minesNegsCounter = countMineNegs(rowIdx, colIdx);
    //console.log('rowIdx',rowIdx,'colIdx',colIdx,'minesNegsCounter',minesNegsCounter);

    return minesNegsCounter
}

function countMineNegs(rowIdx, colIdx) {
    var minesNegsCounter = EMPTY;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gLevel.SIZE - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = gBoard[i][j];
            // console.log('cell', cell);
            if (cell.value === BOMB) {
                minesNegsCounter++
            }
        }
    }
    return minesNegsCounter;
}

/*thank you objects(╯°□°）╯︵ ┻━┻

const BOMB = '💣'
const EMPTY = ' ';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gCell = {}

var elBoard = document.querySelector('.board');

function initGame() {
    gBoard = buildBoard();
    console.table(gBoard);
    renderMat(gBoard);
}

function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE);
    console.table(board)
    board[0][0].value = BOMB;
    board[2][0].value = BOMB;

    return board;
}

function createMat(rowsLength, collsLength) {
    var board = []
    for (var i = 0; i < rowsLength; i++) {
        board[i] = []
        for (var j = 0; j < collsLength; j++) {
            var gCell = {
                value: EMPTY,
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = gCell;
        }
    }
    console.log(board);
    return board;
}

function renderMat(mat) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var gCell = mat[i][j];
            setMinesNegsCount(i, j);
            gCell.value = setMinesNegsCount(i, j)
            console.log(gCell.value);
            var className = 'cell cell' + i + '-' + j;
            var elCell = document.querySelector('td');
            strHTML += `<td class="cell${className}" onclick="cellClicked(${elCell},${i},${j})">
            ${gCell.value}
            </td>`
            // '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    elBoard.innerHTML = strHTML;
}

function setMinesNegsCount(rowIdx, colIdx) {
    var minesNegsCounter = EMPTY;
    var cell = gBoard[rowIdx][colIdx]
    if (cell.value === BOMB) return BOMB;
    minesNegsCounter = countMineNegs(rowIdx, colIdx);
    console.log('rowIdx',rowIdx,'colIdx',colIdx,'minesNegsCounter',minesNegsCounter);

    return minesNegsCounter
}

function countMineNegs(rowIdx, colIdx) {
    var minesNegsCounter = EMPTY;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gLevel.SIZE - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = gBoard[i][j];
            // console.log('cell', cell);
            if (cell.value === BOMB) {
                minesNegsCounter++
            }
        }
    }
    return minesNegsCounter;
}

function cellClicked(elCell, i, j) {
    //console.log('!!')
    //for (gBoard[i][j].isShown=false){}
    if (gBoard[i][j] !== BOMB) {
        //console.log('not a bomb');

    }
}*/
