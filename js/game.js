class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leftKeyActive = false;
  }

  getState() {
    database.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    jet1 = createSprite(width / 2 - 50, height - 100);
    jet1.addImage("jet1", jet1_img);
    jet1.scale = 1;

    jet2 = createSprite(width / 2 + 100, height - 100);
    jet2.addImage("jet2", jet2_img);
    jet2.scale = 1;

    jets = [jet1, jet2];
    bulletGroup = new Group();
  }

  handleElements() {
    form.hide();
    // form.titleImg.position(40, 50);
    // form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 450, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 480, 100);
  }

  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(bg, 0, -height * 5, width, height * 6);
      this.showLife();
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        jets[index - 1].position.x = x;
        jets[index - 1].position.y = y;
        if (index === player.index) {

          this.handlebulletCollision(index);

        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    if (keyDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(DOWN_ARROW)) {
      player.positionY -= 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(LEFT_ARROW)) {
      player.positionX -= 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(RIGHT_ARROW)) {
      player.positionX += 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown("space")) {
      this.shoot();
    }

  }
  shoot() {
    if (player.index == 1) {
      var bullet = createSprite(player.positionX, player.positionY)
      bullet.x = player.positionX+50;
      bullet.y = height - player.positionY
      bullet.velocityX = 20;
      //bullet.depth=player.depth-2;
      bullet.scale = 0.2
      bullet.addImage(bullet1Img);
      bullet.lifetime = 800;
      bulletGroup.add(bullet);
    }
    else if (player.index == 2) {
      var bullet = createSprite(player.positionX, player.positionY)
      bullet.x = player.positionX-50
      bullet.y = height - player.positionY
      bullet.velocityX = -20;
      //bullet.depth=player.depth-2;
      bullet.scale = 0.2
      bullet.addImage(bullet2Img);
      bullet.lifetime = 800;
      bulletGroup.add(bullet);
    }
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},

      });
      window.location.reload();
    });
  }

  handlebulletCollision(index) {

    if (jets[index - 1].collide(bulletGroup)) {
      if (player.life > 0) {
        bulletGroup.destroyEach();
        player.life-=185/4;
        
      }
      player.update();
    }



  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
    noStroke();
    pop();
  }
}
