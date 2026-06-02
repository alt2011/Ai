import Phaser from 'phaser';
import { mapData } from '../maps/mapData.js';
import { MapRenderer } from '../maps/mapRenderer.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.players = {}; // { playerId: playerObject }
        this.playerId = null;
        this.role = null; // 'killer' or 'survivor'
        this.survivorClass = null; // 'shedletsky', 'elliot', or 'noob'
        this.killerClass = null; // Selected killer name
        this.killerAssigned = false; // Ensure only 1 killer per round
        this.survivorCount = 0; // Track number of survivors
        this.maxSurvivors = 8; // Maximum 8 survivors per round
        this.survivorCounts = { 'shedletsky': 0, 'elliot': 0, 'noob': 0 }; // Track each survivor type
        this.killerClasses = ['Slasher', 'C00lkidd', 'John Doe', 'Noli', '1x1x1x1', 'Guest666', 'Nosferatu']; // 7 selectable killers
        this.showKillerSelection = false; // Flag to show killer selection UI
        this.gameStarted = false; // Track if game has started
        this.gameOver = false; // Track if game is over
        this.roundTimer = 300; // 5 minutes per round (in seconds)
        this.aliveCount = 0; // Track alive survivors
        
        // Map system
        this.currentMap = null;
        this.mapRenderer = null;
        this.mapNames = Object.keys(mapData);
        
        // Killer state
        this.killerPlayer = null;
        this.killerAttackCooldown = 0;
        this.killerAttackRange = 50;
        this.killerAttackDamage = 1;
        
        // Survivor tracking
        this.survivors = []; // Array of survivor objects
        this.survivorHealth = { 'shedletsky': 100, 'elliot': 100, 'noob': 100 }; // HP per class
        this.escapeCount = 0; // Survivors who escaped
    }

    preload() {
        // Load assets here
    }

    create() {
        // Select random map for this round
        this.selectRandomMap();
        
        // Render the map
        this.mapRenderer = new MapRenderer(this);
        this.mapRenderer.renderMap(this.currentMap);
        
        // Add collisions between world bounds and obstacles
        this.setupCollisions();
        
        // Create player placeholder and assign role
        this.createPlayer();
        
        // Setup controls
        this.setupControls();
        
        // Setup physics
        this.physics.world.setBounds(0, 0, 1200, 800);
        
        // Start round timer
        this.startRoundTimer();
        
        // Update UI with map name
        document.getElementById('gameStatus').textContent = `Map: ${this.currentMap.name} | Time: ${this.roundTimer}s`;
    }

    update() {
        // Game loop - update player positions, handle input, etc.
        if (this.player && !this.showKillerSelection && !this.gameOver) {
            this.handleMovement();
        }

        // Killer attack cooldown
        if (this.killerAttackCooldown > 0) {
            this.killerAttackCooldown -= 1;
        }

        // Update game status
        if (this.role === 'killer' && this.killerClass) {
            this.updateKillerHUD();
        } else if (this.role === 'survivor') {
            this.updateSurvivorHUD();
        }

        // Check for game over conditions
        if (this.gameStarted && !this.gameOver) {
            this.checkGameOverConditions();
        }
    }

    setupCollisions() {
        // Enable collision with obstacles
        const obstacles = this.mapRenderer.getObstacles();
        if (obstacles && obstacles.length > 0) {
            // Will be checked during movement
        }
    }

    selectRandomMap() {
        // Pick a random map from the available maps
        const randomMapKey = this.mapNames[Math.floor(Math.random() * this.mapNames.length)];
        this.currentMap = mapData[randomMapKey];
    }

    createPlayer() {
        // Get spawn position based on role
        let spawnX = 600;
        let spawnY = 400;

        // Assign role: ONLY 1 KILLER per round, MAX 8 SURVIVORS
        // 30% chance this player is the killer (if not assigned yet)
        if (!this.killerAssigned && Math.random() < 0.3) {
            this.role = 'killer';
            this.killerAssigned = true;
            spawnX = this.currentMap.killerSpawn.x;
            spawnY = this.currentMap.killerSpawn.y;
            
            // Show killer selection UI
            this.showKillerSelectionUI();
            
            const killerColor = 0xff0000; // Red
            this.player = this.add.circle(spawnX, spawnY, 15, killerColor);
            this.killerPlayer = this.player;
        } else if (this.survivorCount < this.maxSurvivors) {
            // Add survivor only if we haven't reached max survivors (8)
            this.role = 'survivor';
            const spawn = this.currentMap.survivorSpawns[this.survivorCount];
            spawnX = spawn.x;
            spawnY = spawn.y;
            this.survivorCount++;
            this.aliveCount++;
            
            // Assign survivor class: Shedletsky, Elliot, or Noob
            const classes = ['shedletsky', 'elliot', 'noob'];
            this.survivorClass = classes[Math.floor(Math.random() * classes.length)];
            this.survivorCounts[this.survivorClass]++;
            
            // Different colors for each survivor class
            const classColors = {
                'shedletsky': 0x00ff00,  // Green
                'elliot': 0x00aaff,     // Light blue
                'noob': 0xffaa00        // Orange
            };
            this.player = this.add.circle(spawnX, spawnY, 15, classColors[this.survivorClass]);
            this.survivors.push({
                sprite: this.player,
                class: this.survivorClass,
                health: this.survivorHealth[this.survivorClass],
                escaped: false,
                dead: false
            });
        } else {
            // Game is full: 1 killer + 8 survivors
            this.role = 'spectator';
            this.player = this.add.circle(600, 400, 15, 0x808080);
            document.getElementById('gameStatus').textContent = `Map: ${this.currentMap.name} | Game is full`;
        }

        this.player.setDepth(10);
        
        // Add physics body
        this.physics.world.enable(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setBounce(0.2, 0.2);
        
        const displayRole = this.role === 'killer' ? 'KILLER (Select)' : 
                           this.role === 'survivor' ? this.survivorClass.toUpperCase() : 'SPECTATOR';
        document.getElementById('playerRole').textContent = displayRole;
        document.getElementById('playerCount').textContent = `${this.survivorCount + (this.killerAssigned ? 1 : 0)}/${this.maxSurvivors + 1}`;
    }

    showKillerSelectionUI() {
        this.showKillerSelection = true;
        
        // Create selection UI overlay
        const selectionOverlay = this.add.rectangle(600, 400, 1200, 800, 0x000000, 0.7);
        selectionOverlay.setDepth(100);
        
        // Create title
        const title = this.add.text(600, 80, 'Select Your Killer', {
            fontSize: '32px',
            fill: '#00ff00',
            align: 'center'
        });
        title.setOrigin(0.5);
        title.setDepth(101);

        // Create map info text
        const mapInfo = this.add.text(600, 130, `Map: ${this.currentMap.name} - ${this.currentMap.description}`, {
            fontSize: '14px',
            fill: '#00ff00',
            align: 'center',
            wordWrap: { width: 700 }
        });
        mapInfo.setOrigin(0.5);
        mapInfo.setDepth(101);
        
        // Create killer selection buttons
        const buttonWidth = 150;
        const buttonHeight = 50;
        const startX = 150;
        const startY = 250;
        const spacing = 160;
        
        this.killerClasses.forEach((killer, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = startX + col * spacing;
            const y = startY + row * spacing;
            
            // Button background
            const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0xff0000);
            button.setDepth(101);
            button.setInteractive({ useHandCursor: true });
            
            // Button text
            const text = this.add.text(x, y, killer, {
                fontSize: '14px',
                fill: '#fff',
                align: 'center'
            });
            text.setOrigin(0.5);
            text.setDepth(102);
            
            // Button click event
            button.on('pointerdown', () => {
                this.selectKiller(killer, selectionOverlay, title, mapInfo);
            });
            
            // Hover effect
            button.on('pointerover', () => {
                button.setFillStyle(0xff6666);
            });
            
            button.on('pointerout', () => {
                button.setFillStyle(0xff0000);
            });
        });
    }

    selectKiller(killerName, overlay, title, mapInfo) {
        this.killerClass = killerName;
        
        // Remove UI elements
        overlay.destroy();
        title.destroy();
        mapInfo.destroy();
        
        this.showKillerSelection = false;
        this.gameStarted = true;
        
        // Update UI
        document.getElementById('playerRole').textContent = killerName.toUpperCase();
    }

    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
        
        // Spacebar for killer attack
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.role === 'killer' && this.gameStarted && !this.gameOver) {
                this.performKillerAttack();
            }
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

        // Check collisions with obstacles
        this.checkObstacleCollisions();
        
        // Check if survivor reached exit
        if (this.role === 'survivor') {
            this.checkExitCollisions();
        }
    }

    checkObstacleCollisions() {
        const obstacles = this.mapRenderer.getObstacles();
        obstacles.forEach(obstacle => {
            if (Phaser.Geom.Rectangle.Overlaps(
                this.player.getBounds(),
                obstacle.getBounds()
            )) {
                // Push player back
                this.player.body.setVelocity(0, 0);
                this.player.x -= this.player.body.velocity.x * 0.016;
                this.player.y -= this.player.body.velocity.y * 0.016;
            }
        });
    }

    checkExitCollisions() {
        const exits = this.mapRenderer.getExits();
        exits.forEach(exit => {
            if (Phaser.Geom.Rectangle.Overlaps(
                this.player.getBounds(),
                exit.getBounds()
            )) {
                this.playerEscaped();
            }
        });
    }

    playerEscaped() {
        this.escapeCount++;
        this.aliveCount--;
        
        // Find and mark survivor as escaped
        this.survivors.forEach(survivor => {
            if (survivor.sprite === this.player) {
                survivor.escaped = true;
            }
        });

        // Update HUD
        document.getElementById('gameStatus').textContent = `${this.escapeCount} survivor(s) escaped!`;
        
        // Fade out player
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 500
        });
        
        this.player.body.setVelocity(0, 0);
    }

    performKillerAttack() {
        if (this.killerAttackCooldown > 0) {
            return; // Still in cooldown
        }

        this.killerAttackCooldown = 60; // 1 second cooldown

        // Check for survivors in range
        this.survivors.forEach(survivor => {
            if (!survivor.dead && !survivor.escaped) {
                const distance = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    survivor.sprite.x, survivor.sprite.y
                );

                if (distance < this.killerAttackRange) {
                    this.damageeSurvivor(survivor);
                }
            }
        });

        // Visual feedback
        this.player.setScale(1.2);
        this.time.delayedCall(100, () => {
            this.player.setScale(1);
        });
    }

    damageSurvivor(survivor) {
        survivor.health -= this.killerAttackDamage;

        if (survivor.health <= 0) {
            this.killSurvivor(survivor);
        } else {
            // Flash survivor sprite
            this.tweens.add({
                targets: survivor.sprite,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                repeat: 2
            });
        }
    }

    killSurvivor(survivor) {
        survivor.dead = true;
        this.aliveCount--;

        // Fade out and remove survivor
        this.tweens.add({
            targets: survivor.sprite,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                survivor.sprite.destroy();
            }
        });
    }

    startRoundTimer() {
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.gameOver && this.gameStarted) {
                    this.roundTimer--;
                    if (this.roundTimer <= 0) {
                        this.endRound();
                    }
                }
            },
            loop: true
        });
    }

    checkGameOverConditions() {
        // All survivors escaped
        if (this.escapeCount === this.survivorCount) {
            this.endRound('survivors_escaped');
        }
        // All survivors killed
        else if (this.aliveCount === 0 && this.killerAssigned) {
            this.endRound('survivors_eliminated');
        }
        // Time is up
        else if (this.roundTimer <= 0) {
            this.endRound('time_up');
        }
    }

    endRound(reason = 'time_up') {
        this.gameOver = true;

        let result = '';
        switch (reason) {
            case 'survivors_escaped':
                result = 'SURVIVORS WIN! All survivors escaped!';
                break;
            case 'survivors_eliminated':
                result = 'KILLER WINS! All survivors eliminated!';
                break;
            case 'time_up':
                result = `SURVIVORS WIN! Time's up! ${this.escapeCount} escaped, ${this.aliveCount} eliminated.`;
                break;
        }

        document.getElementById('gameStatus').textContent = `ROUND OVER: ${result} | Reloading in 5 seconds...`;

        this.time.delayedCall(5000, () => {
            this.scene.restart();
        });
    }

    updateKillerHUD() {
        const status = `${this.aliveCount} survivor(s) alive | Attack cooldown: ${Math.ceil(this.killerAttackCooldown / 60)}s`;
        // Could update a separate HUD element if desired
    }

    updateSurvivorHUD() {
        const status = `Survivors alive: ${this.aliveCount} | Escaped: ${this.escapeCount}`;
        // Could update a separate HUD element if desired
    }

    // Method to assign role from server during multiplayer
    assignRole(role, className = null) {
        this.role = role;
        if (role === 'killer') {
            this.killerClass = className;
            this.player.setFillStyle(0xff0000); // Red
            document.getElementById('playerRole').textContent = className.toUpperCase();
        } else {
            this.survivorClass = className;
            const classColors = {
                'shedletsky': 0x00ff00,  // Green
                'elliot': 0x00aaff,     // Light blue
                'noob': 0xffaa00        // Orange
            };
            this.player.setFillStyle(classColors[className]);
            document.getElementById('playerRole').textContent = className.toUpperCase();
        }
    }

    // Get current map data
    getCurrentMap() {
        return this.currentMap;
    }

    // Get map obstacles
    getObstacles() {
        return this.mapRenderer.getObstacles();
    }

    // Get map exits
    getExits() {
        return this.mapRenderer.getExits();
    }
}
