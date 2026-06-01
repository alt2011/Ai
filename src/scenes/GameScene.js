import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.players = {};
        this.playerId = null;
        this.role = null; // 'killer' or 'survivor'
    }

    preload() {
        // Load assets here
    }

    create() {
        // Create world/arena
        this.createArena();
        
        // Create player placeholder
        this.createPlayer();
        
        // Setup controls
        this.setupControls();
        
        // Setup physics
        this.physics.world.setBounds(0, 0, 1200, 800);
        
        // Update UI
        document.getElementById('gameStatus').textContent = 'Game started';
    }

    update() {
        // Game loop - update player positions, handle input, etc.
        if (this.player) {
            this.handleMovement();
        }
    }

    createArena() {
        // Draw a simple arena boundary
        const graphics = this.make.graphics({ x: 0, y: 0 }, false);
        graphics.lineStyle(3, 0x00ff00, 1);
        graphics.strokeRect(10, 10, 1180, 780);
        
        // Add a grid or background
        const bg = this.add.rectangle(600, 400, 1200, 800, 0x001a00);
        bg.setDepth(-1);
    }

    createPlayer() {
        // Create a placeholder player circle
        this.player = this.add.circle(600, 400, 15, 0x00ff00);
        this.player.setDepth(10);
        
        // Add physics body
        this.physics.world.enable(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setBounce(0.2, 0.2);
        
        // Assign role randomly (temporary)
        this.role = Math.random() > 0.5 ? 'killer' : 'survivor';
        const roleColor = this.role === 'killer' ? 0xff0000 : 0x00ff00;
        this.player.setFillStyle(roleColor);
        
        document.getElementById('playerRole').textContent = this.role.toUpperCase();
    }

    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    handleMovement() {
        const speed = 200;
        let velocityX = 0;
        let velocityY = 0;

        // Arrow keys
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
        }

        this.player.body.setVelocity(velocityX, velocityY);
    }
}
