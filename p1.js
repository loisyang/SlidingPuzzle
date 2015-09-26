/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : 
Created : 
Modified : 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

var IMAGE_PATH = "duck.jpg";
var IMAGE_WIDTH =  690;
var IMAGE_HEIGHT = 472;
// Change these if you use your own image.

var NUM_ROWS = 4;
var NUM_COLS = 4;

// Location of the empty tile:
var emptyRow = 0;
var emptyCol = 0;


// Add any other global variables you may need here.

/**
 * Creates all the tiles necessary.
 * @return undefined
 */
function createTiles(){
  // figure out how wide and tall each tile should be
  
  // add all of the tiles to your page using nested for loops and
  // createDiv. Remember to leave one out for the empty tile
  
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
	
  // Set the div's background
  // hint: css sprites (tutorial: http://css-tricks.com/css-sprites/) are a really
  // nice way to show only a portion of an image on a tile. 

  // add an event listener that will execute some function you define that will
  // move the clicked div to the empty tile location if the div is in a valid
  // position

  // a helpful gremlin left the following cryptic words scrawled here:
  // position absolute
  
	// return your result
}

/**
 * Example function that could get called when a tile is clicked.
 * @param Add whatever params you need!
 * @return Fill in what the function returns here!
 */
function tileClicked(){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot
}

/**
 * Shuffle up the tiles in the beginning of the game
 * @return
 */
function shuffleTiles(){

}

/**
 * When the page loads, create our puzzle
 */
window.onload = function () {
  // generate parameters for a random puzzle
  // create the tiles
  // shuffle the tiles
}
