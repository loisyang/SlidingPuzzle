/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : Lois Yang  
Created : 09/26
Modified : 09/26
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Achieved Bells and Whistles:

3 points: randomly determine the number of rows and columns
5 points: Animate your tiles: When you click on a tile, instead of moving it, figure out how to get your tiles to animate to their desired location.
N points: Personalized CSS
*/

var IMAGES = [["duck.jpg",690, 472], 
              ["girl.jpg",700,699], 
              ["umbrella.jpg",640,631]];
var randomImageNum = Math.floor(Math.random()*IMAGES.length);
var IMAGE_PATH = IMAGES[randomImageNum][0];
var IMAGE_WIDTH =  IMAGES[randomImageNum][1];
var IMAGE_HEIGHT = IMAGES[randomImageNum][2];
// Change these if you use your own image.


var maxRow = 5;
var minRow = 3;
var randomRow = Math.ceil(Math.random()*(maxRow - minRow)) + minRow;
var NUM_ROWS = randomRow;
var NUM_COLS = randomRow;

// Location of the empty tile:
var emptyRow = 0;
var emptyCol = 0;

// Add any other global variables you may need here.
var TILE_WIDTH = IMAGE_WIDTH / NUM_COLS;
var TILE_HEIGHT = IMAGE_HEIGHT / NUM_ROWS;
var border = 3;
var moves = 0;
var shuffleMoves = 100;
var tiles = []
var gameBody = null;
var moveSpeed = randomRow * randomRow * 10;
var steps = 0;
var isShuffling = false;
/**
 * Creates all the tiles necessary.
 * @return undefined
 */
function createTiles(){
  // figure out how wide and tall each tile should be
  // add all of the tiles to your page using nested for loops and
  // createDiv. Remember to leave one out for the empty tile
  gameBody = document.getElementById("gameBody");
  gameBody.style.height = IMAGE_HEIGHT + border + "px";
  gameBody.style.width = IMAGE_WIDTH + "px";
  for (var row = 0; row < NUM_ROWS ; row++) {
    var tileRows = [];
    for (var col = 0; col < NUM_COLS ; col++) {
      if (col == emptyCol && row == emptyRow) {
        tileRows.push(null);
      } else{
        var newTile = createDiv(TILE_WIDTH,TILE_HEIGHT,row, col);
        tileRows.push(newTile);
        gameBody.appendChild(newTile);
      }
    }
    tiles.push(tileRows);
  }
  // hint: you can use document.body.appendchild
}

/**
 * Returns a div with the specified width and height and puts it at the
 * supplied row and column.
 * @param width Fill in what each of these parameters mean!
 * @param height
 * @param row
 * @param col
 * @return The div you created
 */
function createDiv(width, height, row, col){
  // create your div and set its size & position attributes
  // based on parameters
	var eachTile=document.createElement("div");
  eachTile.classList.add('tile');
  eachTile.style.width=width-border*2+'px';
  eachTile.style.height=height-border*2+'px';
  eachTile.style.left=col*width+border+'px'
  eachTile.style.top=row*height+border+'px'
  // Set the div's background
  // hint: css sprites (tutorial: http://css-tricks.com/css-sprites/) are a really
  // nice way to show only a portion of an image on a tile. 
  eachTile.style.backgroundImage = "url(\'" + IMAGE_PATH + "\')";
  eachTile.style.backgroundSize = IMAGE_WIDTH + 'px' + IMAGE_HEIGHT + 'px';
  eachTile.style.backgroundPosition = "-"+col*width + 'px -' + row*height + 'px';
  eachTile.location = {'row':row, 'col':col};
  eachTile.solvedLocation = {'row':row, 'col':col};
  // add an event listener that will execute some function you define that will
  // move the clicked div to the empty tile location if the div is in a valid
  // position

  eachTile.onclick=function(){
    tileClicked(eachTile, row, col);
    checkPuzzleSolved();
  };


  // a helpful gremlin left the following cryptic words scrawled here:
  // position absolute
  
	// return your result
  return eachTile;
}

/**
 * Example function that could get called when a tile is clicked.
 * @param clickedTile
 * @return undefined
 */
function tileClicked(clickedTile){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot

  //slide to the rigth
  if (clickedTile.location.row == emptyRow && clickedTile.location.col == emptyCol - 1) {
    moveTile('right', clickedTile);  
  } 
  //slide to the left
  else if (clickedTile.location.row == emptyRow && clickedTile.location.col == emptyCol + 1) {
    moveTile('left', clickedTile);
  }  
  //slide up
  else if (clickedTile.location.col == emptyCol && clickedTile.location.row == emptyRow + 1) {
    moveTile('up', clickedTile);
  }
  //slide down
  else if (clickedTile.location.col == emptyCol && clickedTile.location.row == emptyRow - 1) {
    moveTile('down', clickedTile);
  }
}

/**
 * A helper function that could animate movements of a tile when it is clicked.
 * @param direction
 * @param clickedTile
 * @return undefined
 */
function moveTile(direction, clickedTile){
  //count the moves only when the game starts
  if (isShuffling == false) {
    steps ++;
  }
  document.getElementById('steps').innerText = steps; 

  //move the tiles
  if (direction == 'right') {
    $(clickedTile).animate({left: emptyCol*TILE_WIDTH + border + 'px'},moveSpeed);
    emptyCol--;
    clickedTile.location.col++;
  } 
  else if (direction == 'left') { 
    $(clickedTile).animate({left: emptyCol*TILE_WIDTH + border + 'px'},moveSpeed);
    emptyCol++;
    clickedTile.location.col--;
  }
  else if (direction == 'up') {
    $(clickedTile).animate({top: emptyRow*TILE_HEIGHT + border + 'px'},moveSpeed);
    emptyRow++;
    clickedTile.location.row--;
  }
  else if (direction == 'down') {
    $(clickedTile).animate({top: emptyRow*TILE_HEIGHT + border + 'px'},moveSpeed);
    emptyRow--;
    clickedTile.location.row++;
  } 
}

/**
 * Shuffle up the tiles in the beginning of the game
 * @return
 */
function shuffleTiles(){
  isShuffling = true;
  for ( var i = 0; i < shuffleMoves; i++) {
    var tile = null;
    while (tile==null) {
      var base = NUM_ROWS*NUM_COLS - 1;
      var randomTileNum = Math.floor((Math.random()*base));
      var row = Math.floor(randomTileNum/NUM_ROWS);
      var col = randomTileNum%NUM_COLS;
      var tile = tiles[row][col];
    }
    tileClicked(tile);
  }
  isShuffling = false;
}

/** Check if the game is solved. Alert message if so. **/
function checkPuzzleSolved() {
  if (emptyRow != 0 || emptyCol != 0) return;
  for (var row = 0; row < NUM_ROWS ; row++) {
    for (var col = 0; col < NUM_COLS ; col++) {
      if (row != emptyRow || col != emptyCol){
        // console.log(emptyRow + " " + emptyCol);
        var tile = tiles[row][col];
        if (tile.location.row != tile.solvedLocation.row || tile.location.col != tile.solvedLocation.col){
          return;
        }
      }
    }
  }
  alert("You made it!");
}

/**
 * When the page loads, create our puzzle
 */
window.onload = function () {
  $('#restart').click(function(){steps=0;shuffleTiles()});
  createTiles();
  shuffleTiles();

}

