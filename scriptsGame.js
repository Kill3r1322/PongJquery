//"anti ghosting"
// the array to add pressed keys to
let keys = [];
// listen for which key is pressed
document.addEventListener('keydown', (event) => {
    if ($.inArray(event.key, keys) === -1) {
        keys.push(event.key);
    }
    //  console.log('keys array after pressed = ' + keys);
});
// listen for which key is unpressed
document.addEventListener('keyup', (event) => {
    // the key to remove
    let removeKey = event.key;
    // remove it
    keys = $.grep(keys, function (value) {
        return value !== removeKey;
    });
    //console.log('keys array after unpressed = ' + keys);
});

class Player {
    constructor() {
        this.score = 0;
        this.id = "player";
    }
}
const player1 = new Player();
const player2 = new Player();

player1.id = "#player1";
player2.id = "#player2";

function restart() {
    player1.score = 0;
    player2.score = 0;
    ball.css({ "top": "165px", "left": "300px" });
    $("#score1").text(player1.score);
    $("#score2").text(player2.score);
    clearInterval(Interval);
    console.log("====================================");
    console.log("restart");
    console.log("player1 score", player1.score);
    console.log("player2 score", player2.score);
    console.log("====================================");
    $('#menuStart').removeClass('d-none');
    $('#box').addClass('d-none');
}

function score(player) {
    ball.css({ "top": "165px", "left": "300px" });
    if (player === player1) {
        player1.score += 1;
        console.log("player1 score", player1.score);
        $("#score1").text(player1.score);
        degree = 45;
    }
    else {
        player2.score += 1;
        console.log("player2 score", player2.score);
        $("#score2").text(player2.score);
        degree = 225;
    }
}
const boxSize = { width: 600, height: 350 };

const duration = 5
const PlayerSpeed = 10
$(document).keydown(function () {
    if (keys.includes("w") || keys.includes("W")) {
        if ($(player1.id).position().top > boxSize.height - boxSize.height) {
            $(player1.id).animate(
                { "bottom": "+=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("s") || keys.includes("S")) {
        if ($(player1.id).position().top + $(player1.id).height() < boxSize.height - 5) {
            $(player1.id).animate(
                { "bottom": "-=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("ArrowUp")) {
        if ($(player2.id).position().top > boxSize.height - boxSize.height) {
            $(player2.id).animate(
                { "bottom": "+=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("ArrowDown")) {
        if ($(player2.id).position().top + $(player2.id).height() < boxSize.height - 5) {
            $(player2.id).animate(
                { "bottom": "-=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    // console.log("box: ", $("#box").position().top);
    // console.log("box+height: " + $("#box").height());
    // console.log("player1: ", $(player1.id).position().top);
    // console.log("player2: ", $(player2.id).position().top);
    // console.log("====================================");
});

//ball
const ball = $('#ball')
const ballSize = { width: 20 + 5, height: 20 + 5 };
let degree = 45;
let BallSpeed = 1; //speed of ball higher = faster

//change speed of ball
function changeSpeed() {
    if (document.getElementById("btnradio1").checked) {
        BallSpeed = 100;
        console.log("btnradio1");
    }
    else if (document.getElementById("btnradio2").checked) {
        BallSpeed = 350;
        console.log("btnradio2");
    }
    else if (document.getElementById("btnradio3").checked) {
        BallSpeed = 500;
        console.log("btnradio3");
    }
}


let Interval;



$('#startGame').click(function () {
    $('#menuStart').addClass('d-none');
    $('#box').removeClass('d-none');

    $(function () {
        changeSpeed();
        console.log(BallSpeed)
        Interval=setInterval(function () {
            let player1Position = $(player1.id).position();
            let player2Position = $(player2.id).position();
            let ballPosition = ball.position();
            const newBallPosition = {
                top: ballPosition.top + Math.sin(degree * Math.PI / 180) * 5,
                left: ballPosition.left + Math.cos(degree * Math.PI / 180) * 5
            };
            //ball hit bottom wall
            if (newBallPosition.top + ballSize.height >= boxSize.height) {
                degree = 360 - degree;
            }
            //ball hit top wall
            else if (newBallPosition.top <= 0) {
                degree = 360 - degree;
            }
            //ball hit right wall
            else if (newBallPosition.left + ballSize.width >= boxSize.width) {
                score(player1);
            }
            //ball hit left wall
            else if (newBallPosition.left <= 0) {
                score(player2);
            }
            //ball hit player1
            else if (newBallPosition.top >= player1Position.top && newBallPosition.top <= player1Position.top + $(player1.id).height() && newBallPosition.left <= $(player1.id).width() + player1Position.left) {
                degree = 180 - degree;
                ball.css(newBallPosition);
            }
            //ball hit player2
            else if (newBallPosition.top >= player2Position.top && newBallPosition.top <= player2Position.top + $(player2.id).height() && newBallPosition.left + ballSize.width >= player2Position.left) {
                degree = 180 - degree;
                ball.css(newBallPosition);
            }
            //player1 win
            else if (player1.score === 5) {
                restart();
                alert("Player 1 win");
            }
            //player2 win
            else if (player2.score === 5) {
                restart();
                alert("Player 2 win");
            }
            //ball move
            else {
                ball.css(newBallPosition);
            }
            console.log("ball speed: ", BallSpeed);
            // console.log("====================================");
            // console.log("newBallPosition.left+ballSize.width: ", newBallPosition.left + ballSize.width);
            // console.log("boxSize-player2.width: ", boxSize.width - $(player2.id).width());
            // console.log("player2Position.left: ", player2Position.left);
            // console.log("degree: ",degree);
            // console.log("====================================");
            // console.log("top: ",newBallPosition.top);
            // console.log("left: ",newBallPosition.left);
            // console.log("top+height: ",newBallPosition.top + ball.height());
            // console.log("height: ",boxSize.height);
            // console.log("degree: ",degree);
            // console.log("====================================");
        }, 1000 / BallSpeed);
    });
});
