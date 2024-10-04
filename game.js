const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  const game = new Phaser.Game(config);
  
  let player;
  let platforms;
  let cursors;
  
  function preload() {
    //images
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('mario', 'assets/mario.png', { frameWidth: 32, frameHeight: 48 });
  }
  
  function create() {
    //background
    this.add.image(400, 300, 'sky');
  
    //platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
  
    //Mario player
    player = this.physics.add.sprite(100, 450, 'mario');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
  
    //player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'mario', frame: 4 }],
      frameRate: 20
    });
  
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  
    //player collision with platforms
    this.physics.add.collider(player, platforms);
  
    //keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }
  
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  