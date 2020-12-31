var monkey,banana,rock,animatedMonkey, bananaGroup,rockGroup,score,jungle,ground,backImage,player_running,backImage,bananaImage,stoneImage,PLAY,END,gameState,gameOver,gameOverImage,restart,restartImage
  function preload(){
  backImage=loadImage("jungle.jpg");
  
    player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
    
    bananaImage=loadImage("banana.png");
    stoneImage=loadImage("stone.png");
   
    gameOverImage=loadImage("game_over_PNG42.png")
    restartImage=loadImage("restart.jpg");
}
function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  
  ground=createSprite(200,400,400,20);
  ground.x=ground.width/2;
  ground.velocityX=-2;
 
  score=0;
  
  jungle=createSprite(200,200,90,90);
  jungle.addImage("jungle",backImage);
  jungle.velocityX=-2;
  
  monkey=createSprite(50,170,20,20);
  monkey.addAnimation("monkey",player_running);
  monkey.scale=0.15;
  monkey.collide(ground);
  
  bananaGroup=createGroup();
  rockGroup=createGroup();
    
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  gameOver=createSprite(200,180,50,50);
  gameOver.addImage("gameOverforreal",gameOverImage);
  gameOver.scale=0.15;
  gameOver.visible=false;
  
  restart=createSprite(200,240,50,50);
  restart.addImage("restart",restartImage);
  restart.scale=0.13;
  restart.visible=false;
}
function draw() {
  background(220);
  text("Score:"+score,350,100)
  monkey.collide(ground);
  if(gameState===PLAY){
    if (jungle.x < 0){
  jungle.x = jungle.width/2;
  }
  if (ground.x < 0){
  ground.x = ground.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY=-6;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    bananaGroup.destroyEach();
   
    switch(score){
      case 10: monkey.scale=0.20;
        break;
      case 20: monkey.scale=0.25;
        break;
      case 30: monkey.scale=0.3;
        break;
      case 40: monkey.scale=0.35;
        break;
      default: break;
    }
 }
    if(monkey.isTouching(rockGroup)){
      gameState=END;
    }
    if(gameState===END){
      ground.velocityX=0;
      jungle.velocityX=0;
      rockGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      gameOver.visible=true;
      restart.visible=true;
      
    }
  goBananas();
  Rockky();
  }
  drawSprites();
}
function goBananas(){
 if(frameCount%250===0){
    banana=createSprite(400,100,20,20);
  banana.y=random(250,300);
   banana.scale=0.05
   banana.velocityX=-2;
   banana.addImage("banana",bananaImage);
  bananaGroup.add(banana);
  }
}
function Rockky(){
  if(frameCount%100===0){
    rock=createSprite(400,370,20,20);
    rock.addImage("rock",stoneImage);
    rock.scale=0.15
    rock.velocityX=-2
    rockGroup.add(rock);
  }
}