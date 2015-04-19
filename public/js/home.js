var X_SEATS = 3;
var Y_SEATS = 3;
var myVar;
var clippyAgent;
var isSeatConfirmed = false;

window.onload = function() {
	transitionBg();
	//THE COLOR TRANSITIONS AREN'T WORKING AT THE MOMENT
	console.log("ok");

	clippy.load('Clippy', function(agent) {
		// Do anything with the loaded agent
		clippyAgent = agent;
		clippyAgent.show();
		clippyAgent.moveTo(25, 25);
		clippyAgent.animate();
		clippyAgent.speak('To get started, click the PixelPusher logo!');
	});

	getRanges();
};


document.getElementById("backButton").onclick = function() {
	var userRow = document.getElementById("user-row").value;
	var userCol = document.getElementById("user-seat").value;
	registerSeatSocket(userRow, userCol);

	//Make sure the row and col values were actually set.
	if (userRow != 0 && userCol != 0) {
		isSeatConfirmed = true;
	}
	else {
		isSeatConfirmed = false;
	}
	backClicked();

};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function transitionBg() {

	console.log("oh");
	document.getElementById("bg").className = "bgYellowTransition";
	setTimeout(secondTransition, 7500);
	setTimeout(thirdTransition, 15000);

	myVar = setInterval( function() {
		console.log("oh yeah");
		document.getElementById("bg").className = "bgYellowTransition";
		setTimeout(secondTransition, 7500);
		setTimeout(thirdTransition, 15000);
	}, 22500);

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function buttonDropAnimation(element, isShown) {
	var fontLogo = document.getElementById("ppFontLogo");
	fontLogo.style.display = "block"
	fontLogo.style.opacity = 0;

	//If the dropdown buttons are not currently visible, then show them
	if (!isShown) {
		var topMargin = -20;
		var transparency = 0;
		var v = setInterval( function () {

			topMargin++;
			transparency = transparency + 0.1;
			element.style.marginTop = topMargin + "px";
			fontLogo.style.marginTop = topMargin + "px";
			element.style.opacity = transparency;
			fontLogo.style.opacity = transparency;

			if (topMargin == 10) {
				clearInterval(v);
			}
		}, 15);
	}
	else {
		var topMargin = 10;
		var transparency = 1;
		var v = setInterval( function () {

			topMargin--;
			transparency = transparency - 0.1;
			element.style.marginTop = topMargin + "px";
			fontLogo.style.marginTop = topMargin + "px";
			element.style.opacity = transparency;
			fontLogo.style.opacity = transparency;

			if (topMargin == -10) {
				clearInterval(v);
				document.getElementById("lowerButtonsDiv").style.display = "none";
			}
		}, 15);
	}

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function displayPPInfo() {

	document.getElementById("home-arrow").style.display = "none";

	var icon = document.getElementById("ppIcon");
	//Rotate the icon 360 degrees when clicking the PixelPusher icon
	//to display the buttons underneath it.
	if (icon.className == "icon-unclicked") {
		icon.className = "icon-clicked";
	}
	else if (icon.className == "icon-init") {
		icon.className = "icon-clicked";
	}
	else {
		icon.className = "icon-unclicked";
	}


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
		buttonDropAnimation(bothButtons, false);

	}
	else if (bothButtons.style.display == "inline-block") {
		buttonDropAnimation(bothButtons, true);

	}
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	This method displays info. about the PixelPusher app. underneath the info. logo.
*/
function infoClicked() {

	var appInfo = document.getElementById("appInfo");
	var sectionValue = document.getElementById("user-section").value;
	var rowValue = document.getElementById("user-row").value;
	var seatValue = document.getElementById("user-seat").value;
	var appCredits = document.getElementById("appCredits");

	var appCreditsString = "PixelPusher is a crowd-sourced media display "
						+ "app created</br>in Spring, 2015 by the AddHawk development team."
						+ "</br></br>Developers:</br>Michael Peter</br>Christopher Wood</br>"
						+ "Dillon Gresham</br>Connor Hoene";
	appCredits.innerHTML = "<div id='appCredits'></br>" + appCreditsString + "</div>";

	if (sectionValue != 0 && rowValue != 0 && seatValue != 0) {
		//NOTE:
		//putting the div tags in the inner html gives the double border look, which i like.
		appInfo.innerHTML = "<div id='appInfo' name='appInfo'><u>Your current seat is:</u></br>Section: "
							+ sectionValue + "</br>Row: " + rowValue + "</br>Seat Number: "
							+ seatValue + "</div>";
	}
	else {
		appInfo.innerHTML = "<div id='appInfo' name='appInfo'><u>Your current seat is:</u></br>Section: "
							+ "</br>Row: " + "</br>Seat Number: "
							+ "</div>";
	}

	if (appInfo.style.display == "none") {

		var topMargin = -10;
		var transparency = 0;
		appInfo.style.display = "block";
		appCredits.style.display = "block";


		var v = setInterval( function () {

			topMargin++;
			transparency = transparency + 0.1;
			appInfo.style.marginTop = topMargin + "px";
			appCredits.style.marginTop = topMargin + "px";
			appInfo.style.opacity = transparency;
			appCredits.style.opacity = transparency;

			if (topMargin == 10) {
				clearInterval(v);
			}
		}, 10);
	}
	else {
		var topMargin = 10;
		var transparency = 1;

		var v = setInterval( function () {

			topMargin--;
			transparency = transparency - 0.1;
			appInfo.style.marginTop = topMargin + "px";
			appCredits.style.marginTop = topMargin + "px";
			appInfo.style.opacity = transparency;
			appCredits.style.opacity = transparency;

			if (topMargin == 0) {
				clearInterval(v);
				appInfo.style.display = "none";
				appCredits.style.display = "none";
			}
		}, 10);
	}

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function settingsClicked() {
	getRanges();
	clippyAgent.moveTo(25, 220);
	clippyAgent.speak("Step 1: Start by choosing the section that your seat is in.");

	//When the user sets their seat for the first time or is resetting
	//the dropdown menu should not have an item selected
	if (document.getElementById("sectionDD") != null) {
		document.getElementById("sectionDD").value = "default";
	}


	//Use these values which would be set by the user to determine
	//whether or not the settings page should prompt the user to enter
	//a seat assignment for the first time or display their current
	//seat assignment.
	var sectionValue = document.getElementById("user-section").value;
	var rowValue = document.getElementById("user-row").value;
	var seatValue = document.getElementById("user-seat").value;


	// change the screen to display the correct elements
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "inline";
	document.getElementById("innerSectionDiv").style.display = "inline-block";
	document.getElementById("tableGridDiv").style.display = "inline-block";
	document.getElementById("pixelTableDiv").style.display = "none";


	var sectionDiv = document.getElementById("sectionDiv");
	var rowDiv = document.getElementById("rowDiv");
	var seatDiv = document.getElementById("seatDiv");
	var rowVal;

	//trying to make it so that the dropdown menu doesn't appear when seat
	//is already chosen
	//when values == 0 this means the user has not set that value yet
	if (sectionValue != 0 && rowValue != 0 && seatValue != 0) {
		sectionDiv.style.display = "none";
		isSeatConfirmed = true;

		document.getElementById("sectionChoiceText").style.display = "block";
		document.getElementById("rowChoiceText").style.display = "block";
		document.getElementById("seatChoiceText").style.display = "block";
		showConfirmAndResetButtons();
	}
	else if (sectionValue != 0 && rowValue == 0 && seatValue == 0) {
		isSeatConfirmed = false;
		sectionDiv.style.display = "none";
		document.getElementById("sectionDD").style.display = "none";

		document.getElementById("sectionChoiceText").style.display = "block";
	}
	else if (sectionValue != 0 && rowValue != 0 && seatValue == 0) {
		isSeatConfirmed = false;
		sectionDiv.style.display = "none";
		document.getElementById("sectionDD").style.display = "none";

		document.getElementById("sectionChoiceText").style.display = "block";
		document.getElementById("rowChoiceText").style.display = "block";
	}
	else {
		isSeatConfirmed = false;
		sectionDiv.style.display = "block";

	}


	$("#sectionDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (rowDiv.style.display == "none") {
			isSeatConfirmed = false;

			clippyAgent.moveTo(25, 290);
			clippyAgent.speak("Step 2: Now choose the row that your seat is in.");

			rowDiv.style.display = "block";
			var sectionVal = $("#sectionDD").val();
			setDDText(sectionVal, 0);
			//Set the hidden values in the html for the user's seat information
			document.getElementById("user-section").value = sectionVal;
		}
	});

	$("#rowDD").change(function () {
		// when a choice is selected, display the drop down box for seats if needed
		if (seatDiv.style.display == "none") {
			isSeatConfirmed = false;

			clippyAgent.moveTo(25, 320);
			clippyAgent.speak("Step 3: Finally, choose your seat number! Then click 'Confirm'.");

			seatDiv.style.display = "block";
			rowVal = $("#rowDD").val();
			highlightRow(rowVal);
			setDDText(rowVal, 1);
			document.getElementById("user-row").value = rowVal;

		}
	});

	$("#seatDD").change(function () {
		isSeatConfirmed = true;

		// when a choice is selected, change to a text field
		var seatVal = $("#seatDD").val();
		highlightSeat(rowVal, seatVal);
		setDDText(seatVal, 2);
		document.getElementById("user-seat").value = seatVal;

		$('#gridHeight').val();
		$('#gridWidth').val();
		$('#user-section').val();
		$('#user-row').val();
		$('#user-seat').val();

		showConfirmAndResetButtons();
	});

	// fill the table div with the correct HTML based on table size
	document.getElementById("tableGridDiv").innerHTML = createSettingsTable(document.getElementById("gridWidth").value, document.getElementById("gridHeight").value);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function setDDText(ddString, dropDownNum) {
	// 0 is sectionDD, 1 is rowDD, 2 is seatDD
	var ddDiv;
	var resultString = "";
	var ddName = "";

	if (dropDownNum == 0) {
		document.getElementById("sectionDiv").style.display = "none";
		ddDiv = document.getElementById("sectionChoiceText");
		resultString = "Section: " + ddString;
		//used for the info icon so that the user can view current seat assignment
		//from the home page.
		document.getElementById("user-section").value = ddString;
		ddName = "section";
	}
	else if (dropDownNum == 1) {
		document.getElementById("rowDiv").style.display = "none";
		ddDiv = document.getElementById("rowChoiceText");
		resultString = "Row: " + ddString;
		document.getElementById("user-row").value = ddString;
		ddName = "row";
	}
	else {
		document.getElementById("seatDiv").style.display = "none";
		ddDiv = document.getElementById("seatChoiceText");
		resultString = "Seat: " + ddString;
		document.getElementById("user-seat").value = ddString;
		ddName = "seat";
	}


	// clear the dropdown's Div and then create a text field
	ddDiv.innerHTML = "";
	ddDiv.innerHTML += "<h name='" + ddName + "Text' id='" + ddName + "Text'>" + resultString + "</h>";

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function createSettingsTable(width, height) {
	var tableString = "<table name='settingsTable' id='settingsTable'>";
	var cellHeight = 300 / height;

	for (var i = 1; i <= width; i++) {

		// id is row_ and then the row number
		tableString += "<tr style='height:" + cellHeight + "px' id='row_" + i + "' name='row_" + i + "'>";
		for (var j = 1; j <= height; j++) {

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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
*This gets the ranges from the database
*/
function getRanges() {
	var parameters = {};
    parameters['api_name'] = 'admin';
    parameters['api_method'] = 'get_range';
    parameters['type'] = 'current';


		var x = X_SEATS;
		var rowDDHtml = "";
		rowDDHtml += "<option value='default' disabled selected>Select Your Row:</option>";
		for(var i = 0; i < x; i++) {
			rowDDHtml += "<option value=" + '"' + (i + 1) + '"' +
			">Row " + (i + 1) + "</option>";
		}
		$("#rowDD").html(rowDDHtml);

		var y = Y_SEATS;
		var seatDDHtml = "";
		seatDDHtml += "<option value='default' disabled selected>Select Your Seat:</option>";
		for(var i = 0; i < y; i++) {
			seatDDHtml += "<option value=" + '"' + (i + 1) + '"' +
			">Seat " + (i + 1) + "</option>";
		}
		$("#seatDD").html(seatDDHtml);

		$("#gridWidth").val(x);
		$("#gridHeight").val(y);

		createSettingsTable(x, y);

    api_request(parameters, function(response){
    	var x;
    	var y;
        if(response['success'] == true) {
          x = 5;//response['data']['x_range'];
          y = 8;//response['data']['y_range'];

          // document.getElementById("gridHeight").value = y;
          // document.getElementById("gridWidth").value = x;

          //alert(x + " " + y);
        }
        else {
            //alert('api called failed');
          x = 5;//response['data']['x_range'];
          y = 8;//response['data']['y_range'];

          //alert(x + " " + y);
        }
    });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Makes a call to the apis
 * @param parameters All parameters being sent to the request
 * @param callback The callback function
 */
function api_request(pars, callback) {

    //Every request starts valid till proven wrong
    var api_response = null;
    var validRequest = true;
    var requestType = 'POST'

    //Check for the request type of POST or GET
    //This infers that the request type is a POST request
    //if not specified otherwise
    if (typeof(pars['request_type'])!='string'){
        requestType = 'POST'
    }
    else {
        requestType = pars['request_type']
    }

    //Validate request before proceeding
    if (!typeof(pars['version']==='string')) { validRequest = false; }
    if (!typeof(pars['api_name']==='string')) { validRequest = false; }
    if (!typeof(pars['api_method']==='string')) { validRequest = false; }

    if (validRequest) {

        //Build request url
        var request_url = window.location.origin + '/api/' + pars['api_name'] + '/' +
            pars['api_method'] + '/param';

        //Turn each key into valid send value
        for (var key in pars)
        {
            var obj = pars[key];
            if (typeof(pars[key])==='undefined')
            {
                pars[key]=obj;
            }
        }

        //Create Ajax Request
        var request = $.ajax({
            url: request_url,
            beforeSend: function() {

            },
            data: pars,
            dataType: 'json',
            processData: true,
            type: requestType

        });
        request.done(function(data){
            api_response = data;
            if (typeof(callback)==='function')
            {
                callback(data);
            }
        });
        request.fail(function(data){

        });
        request.always(function(data){

        });
        request.then(function(){

        });

        return JSON.parse(api_response);
    }
    else {
        return false;
    }

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	In response to clicking the 'back' button from the seat selection
	screen. The home page is shown with only the pixelpusher icon
	displayed. If the user input their seat correctly, the background
	should be the pixel of the media corresponding to their seat selection.
	(assuming that the media has begun being displayed in the first place).
	This method is used for the click response of the "Confirm" button as
	well as the click response for the back button on the settings page.

	isSeatConfirmed
			if true, this means that the user has seat their seat assignment fully
			if false, then the user hasn't set the seat
*/
function backClicked() {

	document.getElementById("bg").className = "";
	document.getElementById("ppIcon").className = "icon-init";
	document.getElementById("ppDiv").style.display = "block";
	document.getElementById("ppFontLogo").style.display = "none";
	document.getElementById("lowerButtonsDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("appInfo").style.display = "none";
	document.getElementById("appCredits").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "none";
	document.getElementById("innerSectionDiv").style.display = "none";
	document.getElementById("tableGridDiv").style.display = "none";
	document.getElementById("confirm-reset-div").style.display = "none";

	if (isSeatConfirmed) {
		clearToBlack();
		//Create a grid of table cells on the main page when the back button is
		//pressed for displaying media to the user
		var userRow = document.getElementById("user-row").value;
		var userCol = document.getElementById("user-seat").value;


		registerSeatSocket(userRow, userCol);

		//Make sure the row and col values were actually set.
		if (userRow != 0 && userCol != 0) {
			createPixelTable(userRow, userCol);
			clippyAgent.moveTo(25, 25);
			clippyAgent.speak("Woo! You're good to go!");
		}
	}

	clippyAgent.hide();

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	This function displays the media associated with the seat assignment that the
	user has put in through the settings menu in the form of a pixels assigned to cells
	in a dynamically generated table.
	No media will be displayed unless the admin is currently streaming media in the first place.

	Params: the seat location of the user in an x, y (row, seat #) pairing.
*/
function createPixelTable(seat_x, seat_y) {

	//Function that creates a grid that will display the pixels
	//associates with your seat assignment.
	var ratio = 1;

	var tableString = "<table name='pixelTable' id='pixelTable' style='z-index:-1; position:absolute'>";
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var cellHeight = windowHeight / ratio;
	var cellWidth = windowWidth / ratio;
	var width = ratio;
	var height = ratio;

	for (var i = 0; i < width; i++) {
		// id is row_ and then the row number
		//id : row_4 (row 4)
		tableString += "<tr style='height:" + cellHeight + "px; width:" + windowWidth + "px;' id='row_" + i + "' name='row_" + i + "'>";
		for (var j = 0; j < height; j++) {
			// id is col_ and then the row number, another _, and then the col number
			//id : col_4_5 (row 4, col 5)
			tableString += "<td id='col_" + i + "_" + j + "' name='col_" + i + "_" + j + "'></td>";
		}
		tableString += "</tr>";
	}
	tableString += "</table>";

	document.getElementById("pixelTableDiv").innerHTML = tableString;
	document.getElementById("pixelTableDiv").style.display = "block";

}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	The reset seat selection button gets displayed when the user has entered all 3
	components of their seat information (section, row, and seat #).
*/
function showConfirmAndResetButtons() {
	document.getElementById("confirm-reset-div").style.display = "block";
}

document.getElementById("reset-seat-button").onclick = function() {
	document.getElementById("confirm-reset-div").style.display = "none";
	document.getElementById("innerSectionDiv").style.display = "inline-block";

	//clear html tags
	document.getElementById("user-section").value = 0;
	document.getElementById("user-row").value = 0;
	document.getElementById("user-seat").value = 0;

	document.getElementById("sectionText").style.display = "none";
	document.getElementById("rowText").style.display = "none";
	document.getElementById("seatText").style.display = "none";

	//clear the text fields and add the dropdown menus back
	document.getElementById("sectionDD").style.display = "block";

	document.getElementById("sectionDD").value = "default";
	document.getElementById("rowDD").value = "default";
	document.getElementById("seatDD").value = "default";

	document.getElementById("sectionDiv").style.display = "block";

};

document.getElementById("confirm-seat-button").onclick = function() {
	backClicked();
};





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function setPixelTableCellColor(row, col, r_val, g_val, b_val) {
	var pixelTable = document.getElementById("pixelTable");
	//pixelTable.rows[row].cells[col].style.backgroundColor = 'rgb(' + r_val + ',' + g_val + ',' + b_val + ')';

	document.getElementById('col_0_0').style.backgroundColor = 'rgb(' + r_val + ',' + g_val + ',' + b_val + ')';
}

//This is the single websocket for each user


/*
This will register a seat the user chose with a
socket on the backend server.
*/
function registerSeatSocket(row, column) {
	var conn;
  //Creates the connection to server for pixel pull ability
  conn = new ab.Session('ws://www.pixelpush.us:8080',
      function() {
          conn.subscribe("all", function(topic, data) {
              //This is where all of the pixels are pulled into on each
              //push from the server for a registerd user.

              //Parse Pixels Into display
							var array = JSON.parse(data.data);

						  var pixel = array[row + "-" + column];

							var x = parseInt(row);
							var y = parseInt(column);
							var rVal = parseInt(pixel['r_val']);
							var gVal = parseInt(pixel['g_val']);
							var bVal = parseInt(pixel['b_val']);

							setPixelTableCellColor(x - 1, y - 1, rVal, gVal, bVal);

              console.log('New Pixel Pushed: "' + topic + '" : ' + data.data);
          });
      },
      function() {
          //Display closed message here if necessary
          //This should be a GUI change, not console change for final version
          console.warn('WebSocket connection closed');
      },
      {'skipSubprotocolCheck': true}
  );
}

/*
This closes the seatsocket for the user to allow for
a new socket or closing of the browser.
*/
function unregisterSeatSocket() {
  if(conn) {
    conn.close();
  }
}


function clearToBlack() {
	document.getElementById("pixelTable").background = "black";
	setPixelTableCellColor(x, y, 0, 0, 0);
}
