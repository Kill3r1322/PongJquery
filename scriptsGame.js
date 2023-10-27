// the array to add pressed keys to
var keys = [];
// listen for which key is pressed
document.addEventListener('keydown', (event) => {
    if ($.inArray(event.key, keys) == -1) {
        keys.push(event.key);
    }
    console.log('keys array after pressed = ' + keys);
});
// listen for which key is unpressed
document.addEventListener('keyup', (event) => {
	// the key to remove
	var removeKey = event.key;
  // rmeove it
	keys = $.grep(keys, function(value) {
		return value != removeKey;
	});
	console.log('keys array after unpress = ' + keys);
});

class Player {
    constructor() {
        this.score = 0;
        this.position = 0;
        const id="player";
    }
}
const player1 = new Player();
const player2 = new Player();

player1.id = "#player1";
player2.id = "#player2";

const duration = 10
$(document).keydown(function () {
    if (keys.includes("w")) {
        $(player1.id).animate(
            { "bottom": "+=4px" },
            {
                duration,
            })
    }

    if (keys.includes("s")) {
        $(player1.id).animate(
            { "bottom": "-=4px" },
            {
                duration,
            })
    }
    
    if (keys.includes("ArrowUp")) {
        $(player2.id).animate(
            { "bottom": "+=4px" },
            {
                duration,
            })
    }

    if (keys.includes("ArrowDown")) {
        $(player2.id).animate(
            { "bottom": "-=4px" },
            {
                duration,
            })
    }
});

//pilka

const ball = document.getElementById("ball");
const degree = 45;
$(function () {
    setInterval(function () {
        
    }, 1000);
});