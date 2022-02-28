var coinImg;
var gameOverImg;
var refreshImg;
var penguinImg;
var penguin;
var roadImg;
var car_1Img, car_2Img;
var score = 0;
var coin;
var gameState = "PLAY";
var refresh;
var PLAY = 1;
var END = 0;
var penguin_collided;
var coinSound = new Audio('Coin.wav');
var checkpointSound = new Audio('Checkpoint.wav');
var drumSound = new Audio('Drum.wav');
var dieSound = new Audio('die.wav');

//car 1 is the right car, car 2 will be the left one

function preload(){
  car_1Img = loadImage("carright.png");
  car_2Img = loadImage("carleft.png");
  coinImg = loadImage("coin.png")
  penguinImg = loadAnimation("Penguin.png", "penguinleft.png", "penguinright.png");
 // penguin_collided = loadAnimation("Penguin.png");
  gameOverImg = loadImage("GameOver.png");
  refreshImg = loadImage("refresh.png");
  roadImg = loadImage("background.png");
  carSound = loadSound("Coin.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  road = createSprite(500, 500, width / 2, 600);
  road.addImage("pathImg", roadImg);
  road.velocityY = 4;
  //road.scale = ;

  penguin = createSprite(width / 2, height - 50, 50, 20);
  penguin.addAnimation("penguin_running", penguinImg);
  penguin.scale = 0.25;

  gameOver = createSprite(width / 2, height - 400);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.23;
  gameOver.visible = false;

  refresh = createSprite(width / 2, height - 220);
  refresh.addImage(refreshImg);
  refresh.scale = 0.23;
  refresh.visible = false;  

  car1Group = new Group();
  car2Group = new Group();
  coinGroup = new Group();
  // drumSound.play();
}



function draw() {
  background(255,255,255);  

  if(gameState === "PLAY"){
  
    edges = createEdgeSprites();

    if(road.y > height){
      road.y = height / 2;
    }
  
    if(keyDown("space")){
      penguin.velocityY = -5;
    }
  
    if(keyDown("right")){
      penguin.velocityX += 1;
    }
  
    if(keyDown("left")){
      penguin.velocityX -= 1;
    }
    drumSound.play();

    // if(score % 100 === 0){
    //   checkpointSound.play();
    // }
  
    penguin.velocityY = penguin.velocityY + 0.5;
    
    penguin.collide(edges);

    if(car1Group.isTouching(penguin)){
      penguin.velocityY = 0;
      gameState = "END";
      // dieSound.play();
   //   penguin.addAnimation("penguinImg", penguinImg);
  // penguin.addAnimation("penguin_collided", penguin_collided);
    }
  
    if(car2Group.isTouching(penguin)){
      penguin.velocityY = 0;
      gameState = "END";
      // dieSound.play();
  //    penguin.addAnimation("penguinImg", penguinImg);
 // penguin.addAnimation("penguin_collided", penguin_collided);
    }

    
  if(coinGroup.isTouching(penguin)){
    score = score + 20;
    coinSound.play();
    coinGroup.destroyEach();
  }

    spawnCar1();
    spawnCar2();
    spawnCoins();

  }

  if(gameState === "END"){
     gameOver.visible = true;
     refresh.visible = true;
     penguin.velocityX = 0;
     penguin.velocityY = 0;
     //penguin.addImage("penguin_collided", penguin_collided);
     car1Group.setVelocityYEach(0);
     car2Group.setVelocityYEach(0);
     road.velocityY = 0;
     coinGroup.setVelocityYEach(0);
     car1Group.setLifetimeEach(-1);
     car2Group.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);
     car1Group.destroyEach();
     car2Group.destroyEach();
     coinGroup.destroyEach();
     penguin.visible = false;
    //  drumSound.stop();
     if(mousePressedOver(refresh)){
       reset();
     }
  }

  drawSprites()
 
  
  textSize(20);
  fill(255);
  text("Score: " + score, width - 150, 30);

}

function spawnCar1(){
  if(World.frameCount % 250 == 0){
    var car_1 = createSprite(Math.round(random(50, width - 50), 40, 20, 20));
    car_1.addImage(car_1Img)
    car_1.scale = 0.25;
    car_1.velocityY = 5;
    car_1.lifetime = 200;
    car1Group.add(car_1);
  }
}

function spawnCar2(){
  if(World.frameCount % 280 == 0){
    var car_2 = createSprite(Math.round(random(50, width - 30), 40, 20, 20));
    car_2.addImage(car_2Img)
    car_2.scale = 0.25;
    car_2.velocityY = 5;
    car_2.lifetime = 250;
    car2Group.add(car_2);
  }
}

function spawnCoins(){
  if(World.frameCount % 320 == 0){
    coin = createSprite(Math.round(random(50, width - 50), 40, 20, 20));
    coin.addImage(coinImg)
    coin.scale = 0.15;
    coin.velocityY = 5;
    coin.lifetime = 250;
    coinGroup.add(coin);
  }
}

function reset(){
  gameState = "PLAY";
  car1Group.destroyEach();
  car2Group.destroyEach();
  coinGroup.destroyEach();
  score = 0;
  penguin.y = height - 50;
  road.velocityY = 4;
  gameOver.visible = false;
  refresh.visible = false;
  penguin.visible = true;
}