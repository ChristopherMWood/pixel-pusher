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
	var sectionDiv = document.getElementById("sectionDiv");
	var rowDiv = document.getElementById("rowDiv");
	var seatDiv = document.getElementById("seatDiv");
	sectionDiv.style.display = "block";

	$("#sectionDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (rowDiv.style.display == "none") {
			rowDiv.style.display = "block";
			setSectionText($("#sectionDD").val());
		}
	});

	$("#rowDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (seatDiv.style.display == "none") {
			seatDiv.style.display = "block";
		}
	});
}

function settingsClicked() {
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
}

function setSectionText(sectString) {
	var sectionDiv = document.getElementById("sectionDiv");
	// clear the sectionDiv and then create a text field
	sectionDiv.innerHTML = "";
	sectionDiv.innerHTML = "<input type='text' name='sectionText' id='sectionText' value='" + sectString + "' readonly>";
}