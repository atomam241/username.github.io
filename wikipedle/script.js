//UI STUFF
function togglePanel(element, display) {
	document.getElementById(element).style.display = display;
	if (display == "block") display = "flex";
	document.getElementById(element).parentElement.style.display = display;
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
document.getElementById("sharebutton").addEventListener("click", async () => {
	try {
		const regex = /(<br>)+/g;
		let shareText = "Wikipedle\n";
		shareText += document.getElementById("sharedata").innerHTML.replace(regex, "\n");
		shareText += '\n' + window.location.href;
		navigator.clipboard.writeText(shareText).then(() => {
			alert("Copied to clipboard!");
		});
	} catch (err) {
		console.error("Share failed:", err.message);
	}
});

function showResults(val) {
	res = document.getElementById("result");
	//res.style.display = "block";
	res.innerHTML = "";
	if (val == "") {
		return;
	}
	let list = "";
	$.ajax({
		type: "POST",
		url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + val + "&srnamespace=0",
		dataType: "jsonp",
		success: function(result, status, xhr) {
			data = result["query"]["search"];
			list = [];
			for (i = 0; i < data.length; i++) {
				list += "<li onmouseover=fill(this.innerHTML)>" + data[i]["title"] + "</li>";
			}
			res.innerHTML = "<ul>" + list + "</ul>";
			res.style.display = "block";
			return true;
		},
		error: function(xhr, status, error) {
			alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
		}
	});
}

function fill(text) {
	document.getElementById("q").value = text;
}

function hideResults() {
	document.getElementById("result").style.display = "none";
}
//GAME STUFF
var guessNum = 0;
var total = 5;
var title = "";
var clues = "";
var ready = false;
var gameover = false;

function game_over(win) {
	gameover = true;
	let ans_html = '<a href="https://en.wikipedia.org/wiki/' + title + '" target="_blank">' + title + "</a>";
	if (win) {
		ans_html += " is correct! &#x1F9E0";
		document.getElementById("sharedata").innerHTML += "&#x1F9E0";
	}
	let motivator = ["You're Insane!", "...are you Ken Jennigs?", "ehh thats par", "Study Up", "Do you live under a rock?", "It was obvious..."];
	ans_html += "<br><i>" + motivator[guessNum - 1] + "</i>";
	$("#answer").html(ans_html);
	togglePanel("end", "block");
	setCookie('seenAbout', true, 100, false)
	setCookie('playedToday', true, 1, true)
	setCookie('shareData', $("#sharedata").html(), 1, true)
	setCookie('guessNum', guessNum, 1, true)
}

function setCookie(cookieName, cookieValue, daysToExpire, atMidnight) {
	var date = new Date();
	date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	if (atMidnight) {
		date.setHours(0, 0, 0, 0);
	}
	document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString()
	console.log("setCookieValue: " + cookieValue);
}

function getCookieValue(cookieName) {
	var cookieValue = document.cookie.match("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)");
	return cookieValue ? cookieValue.pop() : false;
}

function share() {
	if (!gameover) {
		let style = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)";
		$("#game_title").css({
			"background-image": style
		});
	}
	togglePanel("end", "block");
}

function load_game() {
	var answer = "";
	$.getJSON("https://raw.githubusercontent.com/odm7341/wikipedle/main/test.json", function(data) {
		/*
		clues = data[0]["clues"];
		display_clue1(data[0]["clues"][0]);
		document.getElementById("clue2").innerHTML += clues[1];
		document.getElementById("clue3").innerHTML += clues[2];
		document.getElementById("clue4").innerHTML += clues[3];
		document.getElementById("clue5").innerHTML += clues[4];
		document.getElementById("clue6").innerHTML += clues[5];
		// Cheat code here \/
		//answer = data[0]["answer"];
		document.getElementById("answer").innerHTML = data[0]["answer"];
		*/
		return data;
	}).then((game_data) => start_game(game_data));
}

function display_clue1(clue1) {
	clue_string = "";
	for (let i = 0; i < clue1.length - 1; i++) {
		clue_string += clue1[i] + ",  ";
	}
	clue_string += clue1[clue1.length - 1];
	return clue_string;
}
var emojis = ["&#x1F4DA; ", "&#x1F4F0; ", "&#x1F440; ", "&#x1F926; ", "&#x1F926; ", "&#x1F926; "];

function add_clue(clueNum, html) {
	document.getElementById("clue" + (clueNum + 1)).innerHTML = emojis[clueNum] + html;
	document.getElementById("clue" + (clueNum + 1)).style.opacity = 1;
}

function read_clue(clueNum) {
	var innerHtml = document.getElementById("clue" + (clueNum + 1)).innerHTML;
	/*document.getElementById("clue" + (clueNum + 1)).style.animation =
	  "fadeOut 5s forward";
	if (clueNum > 3) {
	  clueNum = 3;
	}
	document.getElementById("clue" + (clueNum + 1)).innerHTML = emojis[clueNum];*/
	return innerHtml;
}

function start_game(data) {
	//the game index is the day
	let d = new Date();
	g_idx = d.getDate();
	
	clues = data[g_idx]["clues"];
	guessNum = 0;
	total = 5;
	title = data[g_idx]["answer"];
	add_clue(0, display_clue1(clues[0]));
	ready = 1;
	// setup game if you already played
	guesses = getCookieValue("guessNum")
	if (guesses) {
		guesses = parseInt(guesses);
		guessNum = guesses
		sharedata = getCookieValue('shareData');
		$("#sharedata").html(sharedata)
		game_over(false)
		show_all_clues(guesses);
		
	}
}

function make_guess(guess) {
	if (!ready) {
		alert("Im not ready yet...");
		return;
	}
	document.getElementById("sharedata").innerHTML += emojis[guessNum];
	guessNum += 1;
	if (guess.toLowerCase() == title.toLowerCase()) {
		// winnner
		game_over(true);
	} else {
		console.log(guessNum);
		$("#clue" + guessNum).css({
			color: "#f22"
		});
		if (guessNum > total) {
			game_over(false);
			return;
		}
		add_clue(guessNum, clues[guessNum]);
		$("#clue" + guessNum + 1).css({
			opacity: 1
		});
	}
}

function show_all_clues(numRed){
	for (let i = 0; i < clues.length; i++){
		if (i < numRed){
			$("#clue" + (i+1)).css({
				color: "#f22"
			});						
		}
		add_clue(i, clues[i]);
		$("#clue" + (i+1)).css({
			opacity: 1
		});
		
	}
}


//check for the answer
$("#searchbtn").click(function(e) {
	e.preventDefault();
	guess = $("#q").val();
	make_guess(guess);
});
// show about if you have never played
cookie = getCookieValue("seenAbout")
console.log(cookie)
if (!cookie) {
	togglePanel("about", "block");
}

load_game();