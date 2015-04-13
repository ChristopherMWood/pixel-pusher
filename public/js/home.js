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

function infoClicked() {
	document.getElementById("bg").className = "infoBody";
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