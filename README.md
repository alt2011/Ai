# Forsaken - Browser Game

A 2D browser-based asymmetrical multiplayer game inspired by Forsaken. One killer hunts down multiple survivors in an above-screen view arena.

## Game Concept

- **1 Killer** vs **Multiple Survivors** (4-8 players suggested)
- **Above-screen 2D view** (top-down perspective)
- **Real-time multiplayer** gameplay
- **Asymmetrical gameplay**: Killer is powerful but outnumbered; Survivors must work together to escape

## Tech Stack

- **Engine**: Phaser 3 (2D game framework)
- **Platform**: Browser (HTML5/WebGL)
- **Multiplayer**: Socket.io (WebSockets for real-time communication)
- **Backend**: Node.js + Express (optional, for game server)
- **Frontend**: Vanilla JavaScript / HTML / CSS

## Project Structure

```
/src
  /scenes          - Phaser game scenes (game logic)
  /sprites         - Game objects (Player, Killer, etc.)
  /physics         - Physics and collision handling
  /network         - WebSocket communication
  /assets
    /sprites       - Character and object graphics
    /sounds        - Audio files
    /maps          - Tilemap data
/index.html        - Main entry point
/server.js         - Backend game server (optional)
/package.json      - Dependencies
```

## Planned Features

### Core Mechanics
- [ ] Player movement and controls
- [ ] Killer abilities and powers
- [ ] Survivor escape objectives
- [ ] Collision and physics
- [ ] Health/death system

### Multiplayer
- [ ] Real-time player synchronization
- [ ] Killer vs Survivor role assignment
- [ ] Game state management

### Polish
- [ ] Graphics and animations
- [ ] Sound effects and music
- [ ] UI/HUD
- [ ] Game over conditions
- [ ] Lobby/matchmaking

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open browser to `http://localhost:8000`

## Development

- Game logic in `/src/scenes`
- Network code in `/src/network`
- Build with npm scripts (webpack/parcel configured in package.json)

---

**Current Status**: Initial setup phase
