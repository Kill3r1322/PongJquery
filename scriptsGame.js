//"anty ghosting"
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
        const id="player";
    }
}
const player1 = new Player();
const player2 = new Player();

player1.id = "#player1";
player2.id = "#player2";

const duration = 5
$(document).keydown(function () {
    if (keys.includes("w")) {
        if ($(player1.id).position().top > $("#box").position().top+2) {
            $(player1.id).animate(
                { "bottom": "+=5px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("s")) {
        if ($(player1.id).position().top + $(player1.id).height() < $("#box").position().top + $("#box").height()-2) {
            $(player1.id).animate(
                { "bottom": "-=5px" },
                {
                    duration,
                })
        }
    }
    
    if (keys.includes("ArrowUp")) {
        if ($(player2.id).position().top > $("#box").position().top+2) {
            $(player2.id).animate(
                { "bottom": "+=5px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("ArrowDown")) {
        if ($(player2.id).position().top + $(player2.id).height() < $("#box").position().top + $("#box").height()-2) {
            $(player2.id).animate(
                { "bottom": "-=4px" },
                {
                    duration,
                })
        }
    }
});

//pilka

const ball = document.getElementById("ball");
var degree = 45;
$(function () {
    setInterval(function () {
        //movment
        var ballPosition = $(ball).position();
        var newBallPosition = {
            top: ballPosition.top + Math.sin(degree * Math.PI / 180) * 5,
            left: ballPosition.left + Math.cos(degree * Math.PI / 180) * 5
        };
        $(ball).css(newBallPosition);
    }, 1000/60);
});