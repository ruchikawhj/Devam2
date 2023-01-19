var database,bgimg,form
var player,game,playerCount
var gameState
var jet1,jet2,jets=[],jet1_img,jet2_img
var bg,allPlayers
var bullet1Img,bullet2Img;
var bulletGroup;
function preload(){
  bgimg=loadImage("spaceformbg.jpg")
  jet1_img=loadImage("ship1.png")
  jet2_img=loadImage("ship 2.png")
bg=loadImage("spacebg.png")
bullet1Img=loadImage("bullet1.png");
bullet2Img=loadImage("bullet2.png");

}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  background(bgimg);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight)

}