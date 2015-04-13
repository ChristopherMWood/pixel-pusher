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

function buttonDropAnimation(element) {
	var topMargin = -20;
	var transparency = 0;
	var v = setInterval( function () {
	
		topMargin++;
		transparency = transparency + 0.1;
		element.style.marginTop = topMargin + "px";
		element.style.opacity = transparency;
		
		if (topMargin == 10) {
			clearInterval(v);
		}
	}, 10);

}

function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}

function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}

function displayPPInfo() {
	var info = document.getElementById("infoDiv");
	var settings = document.getElementById("settingsDiv");
	var bothButtons = document.getElementById("animateDiv");
	
	if (bothButtons.style.display == "none") {
		info.style.display = "block";
		settings.style.display = "block";
		settings.style.textAlign = "center";
		info.style.textAlign = "center";
		
		bothButtons.style.opacity = 0;
		bothButtons.style.display = "inline-block";
		bothButtons.style.textAlign = "center";
		//animate the buttons to fade in and drop down from the logo
		buttonDropAnimation(bothButtons);

	}
	else if (bothButtons.style.display == "inline-block") {
		bothButtons.style.display = "none";
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
			setDDText($("#sectionDD").val(), 0);
		}
	});

	$("#rowDD").change(function () {
		// when a choice is selected, display the drop down box for seats if needed
		if (seatDiv.style.display == "none") {
			seatDiv.style.display = "block";
			setDDText($("#rowDD").val(), 1);
		}
	});

	$("#seatDD").change(function () {
		// when a choice is selected, change to a text field
		setDDText($("#seatDD").val(), 2);
	});
}

function settingsClicked() {
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
}

function setDDText(ddString, dropDownNum) {
	// 0 is sectionDD, 1 is rowDD, 2 is seatDD
	var ddDiv;
	var resultString = "";
	var ddName = "";

	if (dropDownNum == 0) {
		ddDiv = document.getElementById("sectionDiv");
		resultString = "Section: " + ddString;
		ddName = "section";
	}
	else if (dropDownNum == 1) {
		ddDiv = document.getElementById("rowDiv");
		resultString = "Row: " + ddString;
		ddName = "row";
	}
	else {
		ddDiv = document.getElementById("seatDiv");
		resultString = "Seat: " + ddString;
		ddName = "seat";
	}
	// clear the dropdown's Div and then create a text field
	ddDiv.innerHTML = "";
	ddDiv.innerHTML = "<h name='" + ddName + "Text' id='" + ddName + "Text'>" + resultString + "</h>";
}