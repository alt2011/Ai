// GameClient.js - WebSocket communication for multiplayer
// To be implemented with Socket.io

export class GameClient {
    constructor(serverUrl = 'http://localhost:3000') {
        this.serverUrl = serverUrl;
        this.socket = null;
        this.playerId = null;
        this.role = null; // 'killer' or 'survivor'
        this.callbacks = {};
    }

    connect() {
        // Will be implemented with Socket.io
        // this.socket = io(this.serverUrl);
        // this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for game events
        // this.socket.on('playerJoined', (data) => this.onPlayerJoined(data));
        // this.socket.on('playerMoved', (data) => this.onPlayerMoved(data));
        // this.socket.on('roleAssigned', (data) => this.onRoleAssigned(data));
    }

    sendPlayerMovement(x, y) {
        // Send player position to server
        // this.socket.emit('playerMove', { x, y });
    }

    sendPlayerAction(action, data) {
        // Send player actions (attack, ability, etc.)
        // this.socket.emit('playerAction', { action, ...data });
    }

    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    emit(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => callback(data));
        }
    }
}

export default new GameClient();
