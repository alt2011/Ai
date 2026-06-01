import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene],
    render: {
        pixelArt: true,
        antialias: true
    }
};

const game = new Phaser.Game(config);

// Initialize UI
document.getElementById('playerRole').textContent = 'Connecting...';
document.getElementById('gameStatus').textContent = 'Initializing game...';
