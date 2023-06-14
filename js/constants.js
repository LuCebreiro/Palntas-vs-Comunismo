const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_LEFT = 37
const KEY_DOWN = 40
const KEY_SPACE = 32

const LEVEL_1= {

    degradado: 300,

    floors: {
        piso1: {topPlatformY: 420, bottomPlatformY: 627},
        piso2: {topPlatformY : 314, bottomPlatformY: 420},
        piso3: {topPlatformY: 205, bottomPlatformY: 314},
    },
    escaleras: [
        {x: 397, y: 398, large: true, level: "piso1"},
        
        {x: 727, y: 398, large: true, level: "piso1"},

    ],

    plantas: [
        {x: 910, y: 580, isTaken: false},
        {x: 955, y:580, isTaken: false},
    ],

    plataformas: [
        {x: 265, y: 420, width: 176},
        {x: 265, y: 314, width: 176},
        {x: 265, y: 205, width: 176},

        {x: 723, y: 420, width: 176},
        {x: 723, y: 314, width: 176},
        {x: 723, y: 205, width: 176},
    ],

    score: 2,


}

const LEVEL_2= {

    
    degradado: 100,

    floors: {
        piso1: {topPlatformY: 420, bottomPlatformY: 627},
        piso2: {topPlatformY : 314, bottomPlatformY: 420},
        piso3: {topPlatformY: 205, bottomPlatformY: 314},
    },
    escaleras: [
        {x: 397, y: 398, large: true, level: "piso1"},
        {x: 270, y: 294, large: false, level: "piso2"},
        {x: 397, y: 188, large: false, level: "piso3"},
        
        {x: 727, y: 398, large: true, level: "piso1"},
        {x: 855, y: 294, large: false, level: "piso2"},
        {x: 727, y: 188, large: false, level: "piso3"},

    ],

    plantas: [
        {x:  265, y: 580, isTaken: false},
        {x: 220, y:580, isTaken: false},
        {x: 175, y: 580, isTaken: false},
        {x: 875, y:580, isTaken: false},
        {x: 920, y: 580, isTaken: false},
        {x: 965, y:580, isTaken: false},
    ],

    plataformas: [
        {x: 265, y: 420, width: 176},
        {x: 265, y: 314, width: 176},
        {x: 265, y: 205, width: 176},
        
        {x: 723, y: 420, width: 176},
        {x: 723, y: 314, width: 176},
        {x: 723, y: 205, width: 176},
    ],

    score: 6,
    randomMove: false,
    speed: 2,
    obsSpeed: 120
    


}

const LEVEL_3= {

    degradado: 100,

    floors: {
        piso1: {topPlatformY: 420, bottomPlatformY: 627},
        piso2: {topPlatformY : 314, bottomPlatformY: 420},
        piso3: {topPlatformY: 205, bottomPlatformY: 314},
    },
    escaleras: [
        {x: 397, y: 398, large: true, level: "piso1"},
        {x: 270, y: 294, large: false, level: "piso2"},
        {x: 397, y: 188, large: false, level: "piso3"},
        
        {x: 727, y: 398, large: true, level: "piso1"},
        {x: 855, y: 294, large: false, level: "piso2"},
        {x: 727, y: 188, large: false, level: "piso3"},

    ],

    plantas: [
        {x:  265, y: 580, isTaken: false},
        {x: 220, y:580, isTaken: false},
        {x: 175, y: 580, isTaken: false},
        {x: 875, y:580, isTaken: false},
        {x: 920, y: 580, isTaken: false},
        {x: 965, y:580, isTaken: false},
    ],

    plataformas: [
        {x: 265, y: 420, width: 176},
        {x: 265, y: 314, width: 176},
        {x: 265, y: 205, width: 176},
        
        {x: 723, y: 420, width: 176},
        {x: 723, y: 314, width: 176},
        {x: 723, y: 205, width: 176},
    ],

    score: 6,

    randomMove: true,
    speed: 3,
    obsSpeed: 60,

}

    
const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3]
