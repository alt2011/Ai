// mapData.js - Original map designs for asymmetrical gameplay
// Maps designed for 1 killer vs 8 survivors

export const mapData = {
    // Map 1: Industrial Warehouse
    warehouse: {
        name: 'Industrial Warehouse',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 400 },
        survivorSpawns: [
            { x: 150, y: 150 },
            { x: 1050, y: 150 },
            { x: 150, y: 650 },
            { x: 1050, y: 650 },
            { x: 600, y: 100 },
            { x: 600, y: 700 },
            { x: 100, y: 400 },
            { x: 1100, y: 400 }
        ],
        obstacles: [
            // Left warehouse section
            { x: 200, y: 300, width: 150, height: 200 },
            { x: 200, y: 550, width: 150, height: 200 },
            // Right warehouse section
            { x: 850, y: 300, width: 150, height: 200 },
            { x: 850, y: 550, width: 150, height: 200 },
            // Center storage containers
            { x: 500, y: 250, width: 200, height: 100 },
            { x: 500, y: 550, width: 200, height: 100 },
            // Scattered crates
            { x: 350, y: 150, width: 80, height: 80 },
            { x: 820, y: 150, width: 80, height: 80 },
            { x: 350, y: 670, width: 80, height: 80 },
            { x: 820, y: 670, width: 80, height: 80 }
        ],
        exits: [
            { x: 50, y: 400, width: 30, height: 100 },
            { x: 1120, y: 400, width: 30, height: 100 }
        ],
        description: 'Large warehouse with cargo containers and narrow corridors. Survivors must escape through side exits. Killer controls center.'
    },

    // Map 2: Underground Bunker
    bunker: {
        name: 'Underground Bunker',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 400 },
        survivorSpawns: [
            { x: 200, y: 200 },
            { x: 1000, y: 200 },
            { x: 200, y: 600 },
            { x: 1000, y: 600 },
            { x: 600, y: 100 },
            { x: 600, y: 700 },
            { x: 100, y: 400 },
            { x: 1100, y: 400 }
        ],
        obstacles: [
            // Concrete pillars in grid pattern
            { x: 300, y: 200, width: 60, height: 60 },
            { x: 600, y: 200, width: 60, height: 60 },
            { x: 900, y: 200, width: 60, height: 60 },
            { x: 300, y: 400, width: 60, height: 60 },
            { x: 900, y: 400, width: 60, height: 60 },
            { x: 300, y: 600, width: 60, height: 60 },
            { x: 600, y: 600, width: 60, height: 60 },
            { x: 900, y: 600, width: 60, height: 60 },
            // Bunker walls (maze-like)
            { x: 150, y: 250, width: 200, height: 40 },
            { x: 850, y: 250, width: 200, height: 40 },
            { x: 150, y: 550, width: 200, height: 40 },
            { x: 850, y: 550, width: 200, height: 40 }
        ],
        exits: [
            { x: 50, y: 300, width: 30, height: 100 },
            { x: 1120, y: 300, width: 30, height: 100 },
            { x: 50, y: 600, width: 30, height: 100 },
            { x: 1120, y: 600, width: 30, height: 100 }
        ],
        description: 'Claustrophobic bunker with concrete pillars and multiple corridors. Survivors have 4 escape routes but must navigate around support structures.'
    },

    // Map 3: Collapsed Stadium
    stadium: {
        name: 'Collapsed Stadium',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 650 },
        survivorSpawns: [
            { x: 250, y: 200 },
            { x: 950, y: 200 },
            { x: 250, y: 500 },
            { x: 950, y: 500 },
            { x: 600, y: 100 },
            { x: 150, y: 400 },
            { x: 1050, y: 400 },
            { x: 600, y: 600 }
        ],
        obstacles: [
            // Outer arena walls
            { x: 100, y: 150, width: 1000, height: 50 },
            { x: 100, y: 550, width: 1000, height: 50 },
            // Collapsed bleachers (raised platforms)
            { x: 150, y: 250, width: 80, height: 120 },
            { x: 1000, y: 250, width: 80, height: 120 },
            // Center debris piles
            { x: 450, y: 300, width: 150, height: 150 },
            { x: 700, y: 300, width: 150, height: 150 },
            // Mid-field obstacles
            { x: 300, y: 450, width: 200, height: 50 },
            { x: 700, y: 450, width: 200, height: 50 },
            // Small rubble scattered
            { x: 200, y: 350, width: 60, height: 60 },
            { x: 900, y: 350, width: 60, height: 60 }
        ],
        exits: [
            { x: 600, y: 750, width: 80, height: 30 }
        ],
        description: 'Abandoned stadium arena with collapsed bleachers creating elevation changes. Single exit at bottom forces survivors to work together.'
    },

    // Map 4: Office Building Complex
    office: {
        name: 'Office Building Complex',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 400 },
        survivorSpawns: [
            { x: 150, y: 150 },
            { x: 450, y: 150 },
            { x: 750, y: 150 },
            { x: 1050, y: 150 },
            { x: 150, y: 650 },
            { x: 450, y: 650 },
            { x: 750, y: 650 },
            { x: 1050, y: 650 }
        ],
        obstacles: [
            // Office cubicles (left side)
            { x: 100, y: 250, width: 200, height: 100 },
            { x: 100, y: 500, width: 200, height: 100 },
            // Conference rooms (center-left)
            { x: 350, y: 250, width: 120, height: 120 },
            { x: 350, y: 500, width: 120, height: 120 },
            // Break rooms (center-right)
            { x: 650, y: 250, width: 120, height: 120 },
            { x: 650, y: 500, width: 120, height: 120 },
            // Server rooms (right side)
            { x: 900, y: 250, width: 200, height: 100 },
            { x: 900, y: 500, width: 200, height: 100 },
            // Hallway obstruction
            { x: 450, y: 350, width: 300, height: 40 }
        ],
        exits: [
            { x: 50, y: 200, width: 30, height: 100 },
            { x: 1120, y: 200, width: 30, height: 100 },
            { x: 50, y: 600, width: 30, height: 100 },
            { x: 1120, y: 600, width: 30, height: 100 }
        ],
        description: 'Multi-floor office layout with separate rooms and hallways. Survivors can hide in cubicles but must coordinate to reach exits on all sides.'
    },

    // Map 5: Sunken Garden
    garden: {
        name: 'Sunken Garden',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 200 },
        survivorSpawns: [
            { x: 200, y: 350 },
            { x: 1000, y: 350 },
            { x: 200, y: 650 },
            { x: 1000, y: 650 },
            { x: 600, y: 300 },
            { x: 100, y: 500 },
            { x: 1100, y: 500 },
            { x: 600, y: 700 }
        ],
        obstacles: [
            // Sunken center pit (large safe zone but risky)
            { x: 400, y: 400, width: 400, height: 200 },
            // Garden hedge maze walls
            { x: 150, y: 250, width: 300, height: 40 },
            { x: 750, y: 250, width: 300, height: 40 },
            { x: 150, y: 550, width: 300, height: 40 },
            { x: 750, y: 550, width: 300, height: 40 },
            // Stone planters
            { x: 250, y: 100, width: 80, height: 80 },
            { x: 870, y: 100, width: 80, height: 80 },
            { x: 250, y: 720, width: 80, height: 80 },
            { x: 870, y: 720, width: 80, height: 80 }
        ],
        exits: [
            { x: 600, y: 750, width: 60, height: 30 }
        ],
        description: 'Garden with sunken center area creating tactical depth. Survivors can hide in the pit but it\'s a dead-end. Must escape through bottom exit.'
    },

    // Map 6: Train Station
    trainStation: {
        name: 'Train Station',
        width: 1200,
        height: 800,
        killerSpawn: { x: 600, y: 400 },
        survivorSpawns: [
            { x: 150, y: 150 },
            { x: 450, y: 150 },
            { x: 750, y: 150 },
            { x: 1050, y: 150 },
            { x: 150, y: 650 },
            { x: 450, y: 650 },
            { x: 750, y: 650 },
            { x: 1050, y: 650 }
        ],
        obstacles: [
            // Train cars
            { x: 150, y: 250, width: 200, height: 100 },
            { x: 850, y: 250, width: 200, height: 100 },
            { x: 150, y: 550, width: 200, height: 100 },
            { x: 850, y: 550, width: 200, height: 100 },
            // Platform sections
            { x: 450, y: 200, width: 300, height: 50 },
            { x: 450, y: 550, width: 300, height: 50 },
            // Ticket booths
            { x: 100, y: 400, width: 80, height: 80 },
            { x: 1020, y: 400, width: 80, height: 80 },
            // Pillar supports
            { x: 300, y: 400, width: 50, height: 50 },
            { x: 600, y: 300, width: 50, height: 50 },
            { x: 900, y: 400, width: 50, height: 50 }
        ],
        exits: [
            { x: 50, y: 350, width: 30, height: 100 },
            { x: 1120, y: 350, width: 30, height: 100 },
            { x: 600, y: 750, width: 100, height: 30 }
        ],
        description: 'Train station with multiple platforms and cars. Survivors can navigate between trains but exits are limited. Multiple routes available.'
    }
};

export function getMapByName(mapName) {
    return mapData[mapName] || mapData.warehouse;
}

export function getAllMapNames() {
    return Object.keys(mapData).map(key => mapData[key].name);
}
