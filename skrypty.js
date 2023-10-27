$(document).keydown(function (e) {

	var key = e.which;
	if (key == "83") {
		$('#player1').animate(
			{ "bottom": "-=4px" },
			{
				duration: 10,
			})
	}
	if (key == "87") {
		$('#player1').animate(
			{ "bottom": "+=4px" },
			{
				duration: 10,
			})
	}
    if (key == "40") {
		$('#player2').animate(
			{ "bottom": "-=4px" },
			{
				duration: 10,
			})
	}
	if (key == "38") {
		$('#player2').animate(
			{ "bottom": "+=4px" },
			{
				duration: 10,
			})
	}
});

//pilka
