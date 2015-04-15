document.onload = function() {
	transitionBg(true);
	//THE COLOR TRANSITIONS AREN'T WORKING AT THE MOMENT
	console.log("ok");

	getRanges();
};


function transitionBg(isTransitionOn) {

	if (isTransitionOn) {

		console.log("oh");
		var myVar = setInterval( function() {
			console.log("oh yeah");
			document.getElementById("bg").className = "bgYellowTransition";
			setTimeout(secondTransition, 7500);
			setTimeout(thirdTransition, 15000);
		}, 22500);
	}
	else {
		document.getElementById("bg").className = "settingsBody";
	}

}


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

function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}

function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}


function displayPPInfo() {

	
	var icon = document.getElementById("ppIcon");
	//Rotate the icon 360 degrees when clicking the PixelPusher icon
	//to display the buttons underneath it.
	if (icon.className == "icon-unclicked") {
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

		var v = setInterval( function () {

			topMargin--;
			transparency = transparency - 0.1;
			appInfo.style.marginTop = topMargin + "px";
			appInfo.style.opacity = transparency;

			if (topMargin == 0) {
				clearInterval(v);
				appInfo.style.display = "none";
			}
		}, 10);
	}

}

function settingsClicked() {
	getRanges();

	// change the screen to display the correct elements
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "inline";
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
	document.getElementById("tableGridDiv").innerHTML = createSettingsTable(document.getElementById("gridWidth").value, document.getElementById("gridHeight").value);
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

		$("#gridHeight").val(5);
		$("#gridWidth").val(6);

		var x = 5;
		var rowDDHtml = "";
		for(var i = 0; i < x; i++) {
			rowDDHtml += "<option value=" + '"' + (i + 1) + '"' +
			">Seat " + (i + 1) + "</option>";
		}
		$("#rowDD").html(rowDDHtml);

		var y = 10;
		var seatDDHtml = "";
		for(var i = 0; i < x; i++) {
			seatDDHtml += "<option value=" + '"' + (i + 1) + '"' +
			">Seat " + (i + 1) + "</option>";
		}
		$("#seatDD").html(seatDDHtml);

    api_request(parameters, function(response){
    	var x;
    	var y;
        if(response['success'] == true) {
          x = 5;//response['data']['x_range'];
          y = 8;//response['data']['y_range'];

          // document.getElementById("gridHeight").value = y;
          // document.getElementById("gridWidth").value = x;

          alert(x + " " + y);
        }
        else {
            //alert('api called failed');
          x = 5;//response['data']['x_range'];
          y = 8;//response['data']['y_range'];

          alert(x + " " + y);
        }
    });
}

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
        var request_url = window.location.origin + '/pixelpusher/api/' + pars['api_name'] + '/' +
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

function backClicked() {
	document.getElementById("bg").className = "";
	document.getElementById("ppDiv").style.display = "block";
	document.getElementById("ppFontLogo").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "none";
	document.getElementById("innerSectionDiv").style.display = "none";
	document.getElementById("tableGridDiv").style.display = "none";
}
