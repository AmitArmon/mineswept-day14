'use strict'

const BOMB = '💣'
const EMPTY = ' ';
const COVER = '�'

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
var gCell;
var isFirstClick = true;

var elBoard;
var elCell;

function initGame() {
    gBoard = buildBoard();
    console.table(gBoard);
    renderMat(gBoard, '.board');
}

function buildBoard() {
    var board = createMat(gLevel.SIZE, gLevel.SIZE);
    gBoard = board;
    //console.table(gBoard);

    for (var i = 0; i < gLevel.MINES; i++) {
        var randomId = drawNum();
        //console.log(('randomNUm','cell'+randomId));
        getCellById('cell' + randomId).value = BOMB;
        //console.log(getCellById('cell'+randomId));
        getCellById('cell' + randomId).isMine = BOMB;
    }

    //board[0][0] = getCellById('cell00');

    return board;
}

function createCell(iIdx, jIdx, value = EMPTY) {
    var cell = {
        id: 'cell' + iIdx + jIdx,
        value: value,
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true
    }
    //console.log(cell);
    return cell;
}

function createNums() {
    var nums = [];

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var num = '' + i + j;

            nums.push(num)
        }
    }
    //console.log('nums', nums);
    return nums
}

function getCellById(cellIdx) {
    //console.table(gBoard);
    for (var i = 0; i < gBoard.length; i++) {
        var currRow = gBoard[i];
        //console.log('currRow',currRow);
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = currRow[j];
            //console.log(currCell);
            if (currCell.id === cellIdx) {
                //console.log('[currCell]',currCell);
                return currCell;
            }
        }
    }
    return null
}

function renderMat(mat, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            //console.log('cell',cell);
            setMinesNegsCount(i, j);
            cell.minesAroundCount = setMinesNegsCount(i, j);
            cell.value = setMinesNegsCount(i, j);
            var className = '' + i + j;
            var cellContain;
            if (cell.isShown !== true) {
                cellContain = COVER;
            }
            //console.log('value',cell.value);

            strHTML += `<td class="cell${className}" onclick="cellClicked(this,${i},${j})">${cellContain}</td>`
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
    if (cell.value === BOMB) return BOMB;
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

function cellClicked(elCell, i, j) {
    var clickedCell = gBoard[i][j];
    if (isFirstClick === true) {
        isFirstClick =false;
        clickedCell != BOMB;
    }
    if (clickedCell.isShown === false) {
        gGame.shownCount++
        clickedCell.isShown = true;

        elCell.innerHTML = clickedCell.value;

        //console.log(elCell.innerHTML);
    }
}
