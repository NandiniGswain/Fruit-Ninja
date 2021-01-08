  //Game States
  var PLAY=1;
  var END=0;
  var gameState=1;

  //Objects in the game
  var knife;
  var knifeImage ;
  var fruits,fruitGroup;
  var monster,monsterImage;
  var gameOverImage;
  var knifeSwooshSound;
  var gameoverSound;

function preload(){
  
  //Preloading Images to the game
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup() {
  //Creating canvas
  createCanvas(400, 400);
  
  //Creating sword
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  //score as 0
  score=0;

  //Creating new group for fruits
  fruitGroup = createGroup();
    
  //Creating new group for Enemy
  enemyGroup = createGroup();

}

function draw() {
  //background as lightblue
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    enemy();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
  // Increase score if knife touching fruit
  if(fruitGroup.isTouching(knife)) {
    
    //Destroy each fruit    
    fruitGroup.destroyEach();
    
    //Incrementing score by 2
    score = score + 2
    
    //Add sound
    knifeSwooshSound.play();
    }
    
  // Go to end state if knife touching enemy
  if(enemyGroup.isTouching(knife)) {
             
    //Gamestate should be in end state
    gameState = END;
          
    //Destroy each fruit group and enemy group as well 
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
         
    //Velocity of fruit group and enemy group should be 0.
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
        
    //Change Image of the sword to gameover image
    knife.addImage(gameOverImage);
        
    //sword's X and Y should 200
    knife.y = 200;
    knife.x = 200;
   
    //Add sound for gameover
    gameoverSound.play();
    }
}
  
    drawSprites();
  
    //Display score
    fill("darkblue");
    textSize(20);
    text("Score : "+ score,250,50);
}


function enemy(){
   //If framecount 200 or multiples of 200 ....
    if(World.frameCount % 200===0) {
      position = Math.round(random(1,2));
      
      //Create sprite for monster
      monster = createSprite(400, 200, 20, 20);
      //Adding animation to the monster
      monster.addAnimation("moving", monsterImage)
      //Monster's y postion randomly between 100-300
      monster.y = Math.round(random(100, 300));
      //Monster velocity
      monster.velocityX = -8;
      //Lifetime of monster
      monster.setLifetime = 50;

      //using random variable for changing the position of monster
      if(position==1){
      monster.x=600
      monster.velocityX = -(7+(score/10));       
     }
      else if (position==2){
      monster.x=0
      monster.velocityX = 7+(score/10); 
      } 
      
      //Enemy group should conclude Enemy
      enemyGroup.add(monster);

    }
}

// Function for fruits
function fruits() {

  //if framecount 80 or multiples of 80 fruit will be created
  if(World.frameCount % 80 === 0) {
      position = Math.round(random(1,2));
      var fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;

      //Choosing random number of fruits 1-4 a round number
      r = Math.round(random(1, 4));
      if (r == 1) {
        fruit.addImage(fruit1);
      } else if (r == 2) {
        fruit.addImage(fruit2);
      } else if (r == 3) {
        fruit.addImage(fruit3);
      } else if (r == 4) {
        fruit.addImage(fruit4);
      }
      
    //using random variable for changing the position of fruit
      if(position==1){
      fruit.x=600
      fruit.velocityX = -(7+(score/4));       
     }
      else if (position==2){
      fruit.x=0
      fruit.velocityX = 7+(score/4); 
      } 
      
  //Fruits y position randomly between round number 50-350
      fruit.y = Math.round(random(40, 350));
     
  //fruit's lifetime 
      fruit.Lifetime = 100;

  //fruit group should conclude the fruits
      fruitGroup.add(fruit);

    }
  }
