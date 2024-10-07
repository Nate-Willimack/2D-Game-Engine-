const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true  // Enable debugging to visualize hitboxes and see if elements are rendered correctly
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
    // Load assets with proper file paths
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('mario', 'assets/mario.png', { frameWidth: 32, frameHeight: 48 });

    // Log to verify if assets are loading
    this.load.on('complete', () => {
        console.log('Assets loaded successfully!');
    });
}

function create() {
    // Add background image
    let background = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

    // Add platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Create Mario and log coordinates for debugging
    player = this.physics.add.sprite(100, 450, 'mario');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    console.log('Mario position:', player.x, player.y);  // Log Mario's position

    // Create animations for Mario
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

    // Enable collision between player and platforms
    this.physics.add.collider(player, platforms);

    // Add keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Player movement
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

    // Player jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
