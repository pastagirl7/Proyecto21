var skyImg, sky;
//var starImg, star, starsGroup;
var meteorImg, meteor, meteorsGroup;
var rocket, rocketImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
    skyImg = loadImage("fondo estrellas.jpeg");
    //starImg = loadImage("Estrella_amarilla.png");
    meteorImg = loadImage("meteoro.png");
    rocketImg = loadImage("cohete.png");
}

function setup() {
    createCanvas(600,600);
    sky = createSprite(300,300);
    sky.addImage("sky",skyImg);
    sky.velocityY = 1;
    
    //starsGroup = new Group();
    meteorsGroup = new Group();
    invisibleBlockGroup = new Group();
    
    rocket = createSprite(200,200,50,50);
    rocket.scale = 0.3;
    rocket.addImage("rocket", rocketImg);
}

function draw() {
    background(0);
    if (gameState === "play") {
      if(keyDown("left_arrow")){
        rocket.x = rocket.x - 3;
      }
      
      if(keyDown("right_arrow")){
        rocket.x = rocket.x + 3;
      }
      
      if(keyDown("space")){
        rocket.velocityY = -10;
      }
      
      rocket.velocityY = rocket.velocityY + 0.8
      
      if(sky.y > 400){
        sky.y = 300
      }
      spawnMeteors();

      //meteorsGroup.collide(rocket);
    if(meteorsGroup.isTouching(rocket)){
        rocket.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
        rocket.destroy();
        gameState = "end"
      }
      
      drawSprites();
    }
    
    if (gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 230,250)
    }
}

function spawnMeteors() {
    //escribir aquí el código para aparecer puertas en la torre
    if (frameCount % 240 === 0) {
      //var star = createSprite(200, -50);
      var meteor = createSprite(200,10);
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.visible = false;
      invisibleBlock.width = meteor.width;
      invisibleBlock.height = 70;
      
      meteor.x = Math.round(random(120,400));
      //meteor.x = star.x;
      invisibleBlock.x = meteor.x;
      
      //star.addImage(starImg);
      meteor.addImage(meteorImg);
      
      //star.velocityY = 1;
      //star.scale = 0.03;
      meteor.scale = 0.2;
      meteor.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      rocket.depth = meteor.depth;
      rocket.depth +=1;
     
      //asignar lifetime a la variable
      //star.lifetime = 800;
      meteor.lifetime = 800;
      invisibleBlock.lifetime = 800;
  
      
      //agregar cada puerta al grupo
      //starsGroup.add(star);
      invisibleBlock.debug = true;
      meteorsGroup.add(meteor);
      invisibleBlockGroup.add(invisibleBlock);
    }
  }