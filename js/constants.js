const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_LEFT = 37
const KEY_DOWN = 40
const KEY_SPACE = 32

const LEVEL_1= {
    background: "../img/Fondo-Edificio.png",

    //scoreBarImage: "../img/score.png",
    //scoreFrames: 3,

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
        {x: 1150 - 85, y: 580, isTaken: false},
        {x: 1150 - 40, y:580, isTaken: false},
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
    background: "https://www.todofondos.net/wp-content/uploads/112-fondos-de-pantalla-de-super-mario-bros.-hd-imagenes-de-fondo-fondo-de-pantalla.-wallpaper-2k-de-mario-bros.jpg",


    floors: {
        piso1: {topPlatformY: 420, bottomPlatformY: 627},
        piso2: {topPlatformY : 314, bottomPlatformY: 420},
        piso3: {topPlatformY: 205, bottomPlatformY: 314},
    },
    escaleras: [
        {x: 200, y: 100, large: true, level: "piso1"},
        {x: 300, y: 400, large: false, level: "piso2"},
        {x: 500, y: 500, large: false, level: "piso3"},
        
        {x: 727, y: 398, large: true, level: "piso1"},
        {x: 855, y: 294, large: false, level: "piso2"},
        {x: 727, y: 188, large: false, level: "piso3"},

    ],

    plantas: [
        {x: 1150 - 85, y: 580, isTaken: false},
        {x: 1150 - 40, y:580, isTaken: false},
        {x: 1150 - 105, y: 580, isTaken: false},
        {x: 1150 - 125, y:580, isTaken: false},
    ],

    plataformas: [
        {x: 265, y: 420, width: 176},
        {x: 265, y: 314, width: 176},
        {x: 265, y: 205, width: 176},

        {x: 723, y: 420, width: 176},
        {x: 723, y: 314, width: 176},
        {x: 723, y: 205, width: 176},
    ],

    score: 4,


}
    
const LEVELS = [LEVEL_1, LEVEL_2]
