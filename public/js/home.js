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

/*
	This method displays info. about the PixelPusher app. underneath the info. logo.
*/
function infoClicked() {

	//MIGHT BE PROBLEMS HERE WHEN MERGING WITH DILLON BECAUSE THIS METHOD USED TO
	//HANDLE THE SETTINGS BUTTON BEING CLICKED.
	var topMargin = 0;
	var transparency = 0;
	var appInfo = document.getElementById("appInfo");
	
	var v = setInterval( function () {
	
		topMargin++;
		transparency = transparency + 0.1;
		appInfo.style.marginTop = topMargin + "px";
		appInfo.style.opacity = transparency;
		
		if (topMargin == 500) {
			clearInterval(v);
		}
	}, 10);

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