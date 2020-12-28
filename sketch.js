
var monkey , monkey_running;
var banana ,bananaImage, stone , stoneImage;
var ground;
var obstacleGroup,foodGroup;
var score=0;
var survivalTime=0;
var gameState="play";

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(100,200,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(0,330,400,10);
  ground.velocityX=-6;
  
  obstacleGroup = new Group();
  foodGroup= new Group();
}


function draw() {
  background("white");
  
  if (gameState==="play"){
  
  if (ground.x<0){
  ground.x=ground.width/2;
}
  
  if (keyDown("space")&& monkey.y>=150){
    monkey.velocityY=-13;  
  }
  
  food();
  obstacles();

  survivalTime=Math.ceil(frameCount/frameRate());
   
  monkey.velocityY=monkey.velocityY+0.8;}
  
  monkey.collide(ground);
  
 if(obstacleGroup.isTouching(monkey)){
   gameState="end";
 }
  
  if (gameState=="end"){
    monkey.velocityX=0;
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach=-1;
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach=-1;
  }
  
   stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime: "+survivalTime,100,50);
  
  drawSprites();
}

function food(){
  
  if (frameCount%80===0){
    banana=createSprite(400,Math.round(random(120,200)),5,5);
    banana.addImage(bananaImage);
    banana.scale=0.09;
    banana.velocityX=-8;
    foodGroup.add(banana);
  } 
  
}

function obstacles(){
  
  if (frameCount%80==0){
    
    stone=createSprite(400,290,5,5);
    stone.addImage(stoneImage);
    stone.scale=0.2;
    stone.velocityX=-8;
    obstacleGroup.add(stone);
  }
  
}

