document.onload = function() {
  transitionBg(true);
};


function transitionBg(isTransitionOn) {
	if (isTransitionOn) {

		var myVar = setInterval( function() {
			document.getElementById("bg").className = "bgYellowTransition";
			setTimeout(secondTransition, 7500);
			setTimeout(thirdTransition, 15000);
		}, 22500);
	}
	else {
		document.getElementById("bg").className = "infoBody";
	}

}

function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}

function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}

function displayPPInfo() {
	var info = document.getElementById("infoButton");
	var settings = document.getElementById("settingsButton");
	if (info.style.display == "none") {
		info.style.display = "inline-block";
		settings.style.display = "inline-block";
	}
	else if (info.style.display == "inline-block") {
		info.style.display = "none";
		settings.style.display = "none";
	}
}

function infoClicked() {
	//Doesn't work
	//$(window).unbind('load', transitionBg);
	//transitionBg(false);
	

	document.getElementById("bg").className = "infoBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";

	
	document.getElementById("innerSectionDiv").style.display = "block";
	var sectionDD = document.getElementById("sectionDD");
	sectionDD.style.display = "block";
	var rowDD = document.getElementById("rowDD");
	var seatDD = document.getElementById("seatDD");

	$("#sectionDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (rowDD.style.display == "none") {
			rowDD.style.display = "block";
		}
	});

	$("#rowDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (seatDD.style.display == "none") {
			seatDD.style.display = "block";
		}
	});
}

function settingsClicked() {
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
}
