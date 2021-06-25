var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var rand;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudGrp;
var obstacleGrp;
var score = 0;
var game_over;
var restart;
var jumpSound;
var CheckPointS;
var endSound;
var birdDino;
var dinoGrp;
var birdIMG;
var dhruv=[1,2,3,4,"Hello"]

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
 obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle4.png");
  obstacle6 = loadImage("obstacle6.png");
  game_over = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  birdDino = loadAnimation("bird dino.png", "birdDino.png");
  CheckPointS = loadSound("checkPoint.mp3");
  endSound = loadSound("die.mp3");
  birdIMG = loadImage("bird dino.png");
 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,windowHeight-120,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trex collided", trex_collided);
  
  //create a ground sprite
  ground = createSprite(windowWidth/2,windowHeight-100,windowWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 1.5;
  
  
  //creating invisible ground
  invisibleGround = createSprite(windowWidth/2,windowHeight-80,windowWidth,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(windowWidth/2,windowHeight/2,100,100);
  gameOver.visible = false;
  
  restart1 = createSprite(windowWidth/2,windowHeight/2+100,100,100);
  restart1.visible = false;
 
  cloudGrp = createGroup();
  obstacleGrp = createGroup();
  dinoGrp = createGroup();
  
    trex.setCollider("circle",0,0,47) ; 
    trex.debug = false;
}

function draw() {
  //set background color
  background(180,180,180);
  
  textSize(30);
  text("score:"+score,300,40);
  
  if(gameState === PLAY){
     
  if(keyDown("space")&& trex.y >= height-150||touches.length>0) {
    trex.velocityY = -12;
    jumpSound.play();
    touches=[]
  }
    trex.velocityY = trex.velocityY + 0.8
    
    
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
      spawnObstacle();
      spawnCloud();
     spawnDino();
        
    score = score+Math.round(frameRate()/60);
    
  if(score%100 === 0 && score>0){
    CheckPointS.play();
  }
  
    if(obstacleGrp.isTouching(trex)){
     gameState = END;
      endSound.play()
    
    }
    
    if(dinoGrp.isTouching(trex)){
     gameState = END;
      endSound.play()
    
    }
    ground.velocityX = -(7+score/100);
  }  
    

    
  
  
  else if(gameState === END){
     ground.velocityX = 0;
     trex.velocityY = 0;
    obstacleGrp.setVelocityXEach(0);
    cloudGrp.setVelocityXEach(0);
    score = 0;
    cloudGrp.setLifetimeEach(-1); 
    obstacleGrp.setLifetimeEach(-1);
    trex.changeAnimation("trex collided",trex_collided);
    gameOver.scale = 1;
    gameOver.addImage("game over", game_over);
    gameOver.visible = true;
    restart1.addImage("restart", restart);
    restart1.scale = 0.7;
    restart1.visible = true;
    dinoGrp.setVelocityXEach(0);
   dinoGrp.setLifetimeEach(-1);
    if(mousePressedOver(restart1)){
      reset();
    }
  }
  
  // jump when the space key is pressed

  //stop trex from falling down
  trex.collide(invisibleGround);

  console.log(dhruv)
  
  drawSprites();
  
}

  function spawnCloud(){
    if (frameCount%80===0){
      var cloud = createSprite(width,height/2+50,15,15);
      cloud.addImage("clouds", cloudImage);
      cloud.velocityX = -(2+score/100);
      cloud.y = Math.round(random(height/2,height/2+150))
      cloud.scale = 0.8;
     cloud.depth = trex.depth;
      trex.depth = trex.depth+1;
      cloud.lifetime = 500;
      cloudGrp.add(cloud);
    }
  }

 function spawnObstacle(){
   if(frameCount%60===0){
     var obstacle = createSprite(width,height-100,15,15);
     obstacle.velocityX = -(7+score/100);
     obstacle.scale = 0.6;
     obstacle.lifetime = 500;
     obstacleGrp.add(obstacle);
    
     var rand = Math.round(random(1,6)) 
     switch(rand){
       case 1: obstacle.addImage(obstacle1)
               break;
       case 2: obstacle.addImage(obstacle2) 
               break;
      case 3 : obstacle.addImage(obstacle3)
               break;
     case 4  : obstacle.addImage(obstacle4)    
               break;
     case 5  : obstacle.addImage(obstacle5) 
               break;
     case 6  : obstacle.addImage(obstacle6) 
               break;
     default : break;        
     }
   }
 }

  function spawnDino(){
    if (frameCount%200 === 0&&frameCount>1000){
      var dino = createSprite(590,100,15,15);
      dino.addAnimation("dino",birdDino);
      dino.velocityX = -(2+score/100);
      dino.y = Math.round(random(80,150))
      dino.scale = 0.1;
      dino.depth = trex.depth;
      trex.depth = trex.depth+1;
      dino.lifetime = 300;
      dinoGrp.add(dino);
    }
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart1.visible = false;
    obstacleGrp.destroyEach();
    cloudGrp.destroyEach();
    dinoGrp.destroyEach();
    trex.changeAnimation ("running", trex_running);
    score = 0;
    
  }


      
   
    
  