//~~~~~~~~~~~~~~~~~~~~~~~~~~~MAIN PAGE GUI FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
*	This method displays info. about the PixelPusher app. underneath the info. logo.
*/
function infoClicked() {

	appInfo = document.getElementById("appInfo");
	sectionValue = document.getElementById("user-section").value;
	rowValue = document.getElementById("user-row").value;
	seatValue = document.getElementById("user-seat").value;
	appCredits = document.getElementById("appCredits");
	


	var appCreditsString = "PixelPusher is a crowd-sourced media display "
						+ "app created</br>in Spring, 2015 by the AddHawk development team."
						+ "</br></br>Developers:</br>Michael Peter</br>Christopher Wood</br>"
						+ "Dillon Gresham</br>Connor Hoene";
	appCredits.innerHTML = "<div id='appCredits'></br>" + appCreditsString + "</div>";

	if (sectionValue != -1 && rowValue != -1 && seatValue != -1) {
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
