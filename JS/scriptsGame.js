//"anti ghosting"
// the array to add pressed keys to
let keys = [];
// listen for which key is pressed
document.addEventListener('keydown', (event) => {
    if ($.inArray(event.key.toLowerCase(), keys) === -1) {
        keys.push(event.key.toLowerCase());
    }
      console.log('keys array after pressed = ' + keys);
});
// listen for which key is unpressed
document.addEventListener('keyup', (event) => {
    // the key to remove
    let removeKey = event.key.toLowerCase();
    // remove it
    keys = $.grep(keys, function (value) {
        return value !== removeKey;
    });
    //console.log('keys array after unpressed = ' + keys);
});
function alertWhoWon(who){
    swal({
        title: who + "win",
        button: {
            text: "Restart",
        }
    })
}
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

const duration = 5
const PlayerSpeed = 15; //speed of player higher = faster
$(document).keydown(function () {
    if (keys.includes("w")) {
        if ($(player1.id).position().top > boxSize.height - boxSize.height) {
            $(player1.id).animate(
                { "bottom": "+=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }

    }

    if (keys.includes("s")) {
        if ($(player1.id).position().top + $(player1.id).height() < boxSize.height - 5) {
            $(player1.id).animate(
                { "bottom": "-=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("arrowup")) {
        if ($(player2.id).position().top > boxSize.height - boxSize.height) {
            $(player2.id).animate(
                { "bottom": "+=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }

    if (keys.includes("arrowdown")) {
        if ($(player2.id).position().top + $(player2.id).height() < boxSize.height - 5) {
            $(player2.id).animate(
                { "bottom": "-=" + PlayerSpeed + "px" },
                {
                    duration,
                })
        }
    }
});

function score(player) {
    ball.css({ "top": "165px", "left": "300px" });
    if (player === player1) {
        player1.score += 1;
        console.log("player1 score", player1.score);
        $("#score1").text(player1.score);
        if(Math.random() > 0.5)
        degree = 45;
        else
            degree = 315;
    }
    else {
        player2.score += 1;
        console.log("player2 score", player2.score);
        $("#score2").text(player2.score);
        if(Math.random() > 0.5)
        degree = 225;
        else
            degree = 135;
    }
}
const boxSize = { width: 600, height: 350 };

//ball
const ball = $('#ball')
const ballSize = { width: 20 + 5, height: 20 + 5 };
let degree;
if (Math.random() > 0.5)
    degree = 45;
else
    degree = 135;
let BallSpeed = 1; //speed of ball higher = faster

//change speed of ball
function changeSpeed() {
    let speed = 18;
    if (document.getElementById("btnradio1").checked) {
        BallSpeed = speed*0.5;
        console.log("btnradio1");
    }
    else if (document.getElementById("btnradio2").checked) {
        BallSpeed = speed;
        console.log("btnradio2");
    }
    else if (document.getElementById("btnradio3").checked) {
        BallSpeed = speed * 2;
        console.log("btnradio3");
    }
}


let Interval;
const hitPlayer2 = (newBallPosition, player2Position) => (newBallPosition.top >= player2Position.top && newBallPosition.top <= player2Position.top + $(player2.id).height() && newBallPosition.left + ballSize.width >= player2Position.left);
const hitPlayer1 = (newBallPosition, player1Position) => (newBallPosition.top >= player1Position.top && newBallPosition.top <= player1Position.top + $(player1.id).height() && newBallPosition.left <= $(player1.id).width() + player1Position.left);

$('#startGame').click(function () {
    $('#menuStart').addClass('d-none');
    $('#box').removeClass('d-none');
    changeSpeed();
    $(function () {
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
            else if (hitPlayer1(newBallPosition,player1Position)) {
                degree = 180 - degree;
                ball.css(newBallPosition);
            }
            //ball hit player2
            else if (hitPlayer2(newBallPosition,player2Position)) {
                degree = 180 - degree;
                ball.css(newBallPosition);
            }
            //player1 win
            else if (player1.score === 5) {
                restart();
                alertWhoWon("Player 1 ")
            }
            //player2 win
            else if (player2.score === 5) {
                restart();
                alertWhoWon("Player 2 ")
            }
            //ball move
            else {
                ball.css(newBallPosition);
            }
            console.log("ball speed: ", BallSpeed);
        }, Math.round(100 / BallSpeed));
    });
});
let IntervalColors;

$(document).keydown(function () {
    let colorP1 = "Blue";
    let colorP2 = "Red";
    IntervalColors=setInterval(function () {
        if (keys.includes("w")) {
            $('#w').css('background-color', colorP1, 'color', 'white');
        } else {
            $('#w').css('background-color', '#ffffff');
        }

        if (keys.includes("s")) {
            $('#s').css('background-color', colorP1);
        } else {
            $('#s').css('background-color', '#ffffff');
        }

        if (keys.includes("arrowup")) {
            $('#UpArrow').css('background-color', colorP2);
        } else {
            $('#UpArrow').css('background-color', '#ffffff');
        }

        if (keys.includes("arrowdown")) {
            $('#DownArrow').css('background-color', colorP2);
        } else {
            $('#DownArrow').css('background-color', '#ffffff');
        }
    }, 10);
});
