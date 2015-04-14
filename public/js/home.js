document.onload = function() {
  transitionBg(true);

  getRanges();
};

/*
document.getElementById("ppIcon").onmouseover = function() {
	var width = 0;
	var transparency = 0;
	var fontLogo = document.getElementById("ppFontLogo");
	fontLogo.style.display = "inline";
	var v = setInterval( function () {

		width++;
		transparency = transparency + 0.1;
		fontLogo.style.width = width + "px";
		fontLogo.style.opacity = transparency;

		if (width == 400) {
			clearInterval(v);
		}
	}, 5);
}

document.getElementById("ppIcon").onmouseout = function() {
	var width = 100;
	var transparency = 1;
	var fontLogo = document.getElementById("ppFontLogo");
	//fontLogo.style.display = "none";
	var v = setInterval( function () {

		width--;
		transparency = transparency - 0.1;
		fontLogo.style.width = width + "px";
		fontLogo.style.opacity = transparency;

		if (width == 0) {
			clearInterval(v);
		}
	}, 5);

}
*/



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
	}, 15);

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
	var bothButtons = document.getElementById("lowerButtonsDiv");

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

	var appInfo = document.getElementById("appInfo");

	if (appInfo.style.display == "none") {

		var topMargin = -10;
		var transparency = 0;
		appInfo.style.display = "block";

		var v = setInterval( function () {

			topMargin++;
			transparency = transparency + 0.1;
			appInfo.style.marginTop = topMargin + "px";
			appInfo.style.opacity = transparency;

			if (topMargin == 10) {
				clearInterval(v);
			}
		}, 10);
	}
	else {
		var topMargin = 10;
		var transparency = 1;
		appInfo.style.display = "none";

		var v = setInterval( function () {

			topMargin--;
			transparency = transparency - 0.1;
			appInfo.style.marginTop = topMargin + "px";
			appInfo.style.opacity = transparency;

			if (topMargin == 0) {
				clearInterval(v);
			}
		}, 10);
	}

}

function settingsClicked() {
	// change the screen to display the correct elements
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "block";
	document.getElementById("innerSectionDiv").style.display = "inline-block";
	document.getElementById("tableGridDiv").style.display = "inline-block";


	var sectionDiv = document.getElementById("sectionDiv");
	var rowDiv = document.getElementById("rowDiv");
	var seatDiv = document.getElementById("seatDiv");
	var rowVal;
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
			rowVal = $("#rowDD").val();
			highlightRow(rowVal);
			setDDText(rowVal, 1);
		}
	});

	$("#seatDD").change(function () {
		// when a choice is selected, change to a text field
		highlightSeat(rowVal, $("#seatDD").val());
		setDDText($("#seatDD").val(), 2);
	});

	// fill the table div with the correct HTML based on table size
	document.getElementById("tableGridDiv").innerHTML = createSettingsTable(10, 10);
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


function createSettingsTable(width, height) {
	var tableString = "<table name='settingsTable' id='settingsTable'>";

	for (var i = 0; i < width; i++) {

		// id is row_ and then the row number
		tableString += "<tr id='row_" + i + "' name='row_" + i + "'>";
		for (var j = 0; j < height; j++) {

			// id is seat_ and then the row number, another _, and then the seat number
			tableString += "<td id='seat_" + i + "_" + j + "' name='seat_" + i + "_" + j + "'></td>";
		}
		tableString += "</tr>";
	}
	tableString += "</table>";

	return tableString;
}

function highlightRow(rowNum) {
	var rowName = "row_" + rowNum;
	document.getElementById(rowName).style.backgroundColor = "red";
}

function highlightSeat(rowNum, seatNum) {
	var seatName = "seat_" + rowNum + "_" + seatNum;
	console.log(seatName);
	// get the row name to unhighlight it
	var rowName = "row_" + rowNum;
	document.getElementById(rowName).style.backgroundColor = "white";

	document.getElementById(seatName).style.backgroundColor = "red";
}

/*
*This gets the ranges from the database
*/
function getRanges() {
  var parameters = {};
    parameters['api_name'] = 'admin';
    parameters['api_method'] = 'get_range';
    parameters['type'] = 'current';

    api_request(parameters, function(response){
        if(response['success'] == true) {
          var x = response['data']['x_range'];
          var y = response['data']['x_range'];

          alert(x + " " + y);
        }
        else {
            alert('api called failed');
        }
    });
}
