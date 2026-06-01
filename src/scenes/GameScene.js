import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.players = {}; // { playerId: playerObject }
        this.playerId = null;
        this.role = null; // 'killer' or 'survivor'
        this.killerAssigned = false; // Ensure only 1 killer per round
        this.survivorCount = 0; // Track number of survivors
        this.maxSurvivors = 8; // Maximum 8 survivors per round
    }

    preload() {
        // Load assets here
    }

    create() {
        // Create world/arena
        this.createArena();
        
        // Create player placeholder and assign role
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
        
        // Assign role: ONLY 1 KILLER per round, MAX 8 SURVIVORS
        // If no killer has been assigned yet, 30% chance this player is the killer
        if (!this.killerAssigned && Math.random() < 0.3) {
            this.role = 'killer';
            this.killerAssigned = true;
            const killerColor = 0xff0000; // Red
            this.player.setFillStyle(killerColor);
        } else if (this.survivorCount < this.maxSurvivors) {
            // Add survivor only if we haven't reached max survivors (8)
            this.role = 'survivor';
            this.survivorCount++;
            const survivorColor = 0x00ff00; // Green
            this.player.setFillStyle(survivorColor);
        } else {
            // Game is full: 1 killer + 8 survivors
            this.role = null;
            this.player.setFillStyle(0x808080); // Gray (spectator/full)
            document.getElementById('gameStatus').textContent = 'Game is full';
            return;
        }
        
        document.getElementById('playerRole').textContent = this.role ? this.role.toUpperCase() : 'FULL';
        document.getElementById('playerCount').textContent = `${this.survivorCount + (this.killerAssigned ? 1 : 0)}/${this.maxSurvivors + 1}`;
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

    // Method to assign killer role from server during multiplayer
    assignRole(role) {
        this.role = role;
        const roleColor = role === 'killer' ? 0xff0000 : 0x00ff00;
        this.player.setFillStyle(roleColor);
        document.getElementById('playerRole').textContent = role.toUpperCase();
    }
}
