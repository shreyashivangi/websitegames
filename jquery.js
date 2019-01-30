var playing = false;
var score, left, i, step, action;
var fruits = ['apple', 'banana', 'blueberry', 'cherry', 'kiwi', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'strawberry', 'watermelon'];

//click on start and reset button
$(document).ready(function () {
	//slice the fruit, play sound, explode it and then hide it to bring new fruit
	$("#fruity").mouseover(function(){
		score += 1;
		$("#scorevalue").html(score);
		//document.getElementById("slicesound").play();
		$("#slicesound")[0].play();
		//stop fruit
		clearInterval(action);
		//hide fruit
		$("#fruity").hide();
		//send new fruit
		setTimeout(fruit(), 500);	
	})
	
	//add lifes
function heart() {
	$("#life").empty();
	for (i = 0; i < left; i++) {
		$("#life").append('<img src="heart.png" class = "life">');
	}
}

//choose a ransom fruit
function choosefruit() {
	$("#fruity").attr('src', fruits[Math.round(11 * Math.random())] + '.png');
}

//stop adding fruit
function stop() {
	clearInterval(action);
	$("#fruity").hide();
}

//1.define and change a random friut
function fruit() {
	choosefruit();
	$("#fruity").show();
	$("#fruity").css({'left' : (Math.round(460 * Math.random())), 'top' : -50});
	
	step = 1 + Math.round(5 * Math.random());
	
	//2.MOVE FRUIT DOWN a step in 10msec
	action = setInterval(function () {
		$("#fruity").css('top', $("#fruity").position().top + step);
		
		//if too low
		if ($("#fruity").position().top > 400) {
			
			//yes----CHECK any life
			if (left > 1) {
				//yes------create random fruit &&  remove a life
				choosefruit();
				$("#fruity").show();
				$("#fruity").css({'left' : (Math.round(460 * Math.random())), 'top' : -50});
				step = 1 + Math.round(5 * Math.random());
				//reduce left
				left -= 1;
				//populate heart
				heart();
			} else {
				//no-------game over restart
				playing = false;
				$("#sr").html("REPLAY");
				$("#gameover").show();
				$("#gameover").html("<p>GAME OVER !</p><p>YOUR SCORE IS " + score + '</p>');
				$("#life").hide();
				$("#score").hide();
				//stop adding more fruit
				stop();
			}
		}
	}, 10);
	
}
	
	$(function () {
		$("#sr").click(function () {
			//we are playing
			if (playing == true) {
				//yes----reload page
				location.reload();
			} else {
				//no-----initiate game
				playing = true;
				$("#sr").html("RESET");
				
				//set initial score
				score = 0;
				$("#scorevalue").html(score);
			
				//set life left 
				left = 3;
				$("#message").hide();
				$("#instruction").hide();
				$("#game").hide();

				//show life
				heart();
				$("#life").show();
				$("#score").show();
				$("#fruit").show();
				
				//start game add fruit
				fruit();
				$("#gameover").hide();
			}
		});
	});
});
//slice fruit-----play sound && explode fruit