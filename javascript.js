var playing = false;
var score, action, tr, cans, i, count = 0;

function hide(Id) {
	document.getElementById(Id).style.display = "none";
}

function show(Id) {
	document.getElementById(Id).style.display = "block";
}

function stopcountdown() {
	clearInterval(action);
}

function startcountdown() {
	action = setInterval(function () {
		tr -= 1;
		document.getElementById("trvalue").innerHTML = tr;
		if (tr<=5){
			document.getElementById("tr").style.color = "red";	
		}
		if (tr == 0 || score <= -5 ) {
			stopcountdown();
			show("gameover");
			document.getElementById("gameover").innerHTML = "<p>GAME OVER</p><p>YOUR SCORE IS " + score + ".</p>";
			pscore = score;
			hide("tr");
			hide("correct");
			hide("wrong");
			hide("score");
			show("message");		
			document.getElementById("message").innerHTML = "TRY AGAIN";
			playing = false;
			document.getElementById("startreset").innerHTML = "REPLAY";
		}
	}, 1000);
}

function generateqa() {
	var x = 1 + Math.round(9 * Math.random()), y = 1 + Math.round(9 * Math.random()), cpos = 1 + Math.round(3 * Math.random()), ans = [cans], wans;
	cans = x * y;
	document.getElementById("question").innerHTML = x + "x" + y;
	document.getElementById("box" + cpos).innerHTML = cans;
	for (i = 1; i < 5; i += 1) {
		if (i !== cpos) {
			do {
				wans = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
			} while (ans.indexOf(wans) > -1);
			document.getElementById("box" + i).innerHTML = wans;
			ans.push(wans);
		}
	}

}

document.getElementById("startreset").onclick = function () {
	if (playing == true) {
		location.reload();
	} else {
		playing = true;
		score = 0;
		hide("message");
		show("score");
		document.getElementById("scorevalue").innerHTML = score;
		show("tr");
		tr = 60;
		document.getElementById("trvalue").innerHTML = tr;
		if (tr <= 5) {
			document.getElementById("tr").style.backgroundColor = "red";
		}
		hide("gameover");
		document.getElementById("instruction").innerHTML = "SELECT THE CORRECT ONE";
		document.getElementById("startreset").innerHTML = "RESET GAME";
		startcountdown();
		generateqa();
	}
};

for (i = 1; i < 5; i += 1) {
	document.getElementById("box" + i).onclick = function () {
		if (playing == true) {
			if (this.innerHTML == cans) {
				score += 1;
				count += 1;
				document.getElementById("scorevalue").innerHTML = score;
				hide("wrong");
				show("correct");
				document.getElementById("instruction").innerHTML = " YES !! ";
				if (count == 2) {
					document.getElementById("instruction").innerHTML = " ON A HATTRICK !! ";
				}
				if (count == 3) {
					document.getElementById("instruction").innerHTML = "HATTRICK !! " + count + " IN A ROW";
				}
				if (count > 4) {
					document.getElementById("instruction").innerHTML = "STREAK !! " + count + " IN A ROW";
				}
				setTimeout(function () {
					hide("correct");
					document.getElementById("instruction").innerHTML = "SELECT THE CORRECT ONE";
				}, 1000);
				generateqa();
			} else {
				count = 0;
				score -= 1;
				document.getElementById("scorevalue").innerHTML = score;
				hide("correct");
				show("wrong");
				setTimeout(function () {
					hide("wrong");
				}, 1000);
			}
		}
    };
}
