// mapRenderer.js - Renders maps in the game scene

export class MapRenderer {
    constructor(scene) {
        this.scene = scene;
        this.obstacles = [];
        this.exits = [];
        this.currentMap = null;
    }

    renderMap(mapData) {
        this.currentMap = mapData;
        
        // Draw obstacles
        mapData.obstacles.forEach(obstacle => {
            this.drawObstacle(obstacle);
        });

        // Draw exits
        mapData.exits.forEach(exit => {
            this.drawExit(exit);
        });

        // Draw boundary
        this.drawBoundary(mapData.width, mapData.height);
    }

    drawObstacle(obstacle) {
        const rect = this.scene.add.rectangle(
            obstacle.x + obstacle.width / 2,
            obstacle.y + obstacle.height / 2,
            obstacle.width,
            obstacle.height,
            0x444444
        );
        rect.setStrokeStyle(2, 0x666666);
        rect.setDepth(5);

        // Add physics body
        this.scene.physics.world.enable(rect);
        rect.body.moves = false;
        
        this.obstacles.push(rect);
        return rect;
    }

    drawExit(exit) {
        const exitRect = this.scene.add.rectangle(
            exit.x + exit.width / 2,
            exit.y + exit.height / 2,
            exit.width,
            exit.height,
            0x00ff00,
            0.5
        );
        exitRect.setStrokeStyle(3, 0x00ff00);
        exitRect.setDepth(3);

        // Add physics body for collision detection
        this.scene.physics.world.enable(exitRect);
        exitRect.body.moves = false;
        exitRect.isExit = true;

        this.exits.push(exitRect);
        return exitRect;
    }

    drawBoundary(width, height) {
        const graphics = this.scene.make.graphics({ x: 0, y: 0 }, false);
        graphics.lineStyle(3, 0x00ff00, 1);
        graphics.strokeRect(10, 10, width - 20, height - 20);
        graphics.setDepth(1);
    }

    getObstacles() {
        return this.obstacles;
    }

    getExits() {
        return this.exits;
    }

    clearMap() {
        this.obstacles.forEach(obstacle => obstacle.destroy());
        this.exits.forEach(exit => exit.destroy());
        this.obstacles = [];
        this.exits = [];
    }
}
