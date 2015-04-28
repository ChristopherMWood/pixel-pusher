
document.getElementById("start-button").onclick = function() {
	var parameters = {};
    parameters['api_name'] = 'photo';
    parameters['api_method'] = 'get_pixels';
		parameters['params'] = "1a";

    api_request(parameters, function(response){

        if(response['success'] == true) {
			//
        }
        else {
			//error message here
        }
    });

}

document.getElementById("stop-button").onclick = function() {
	if(playing) {
		intervalCount = 100;
		stopLoop = true;
	}
}

var stopLoop = false;
var playing = false;
var intervalCount = 0;
var i = 1;
var i_sub = 1;
var prefix = "";
var countdown = true;
function playSlideshow() {

	if(!playing) {
		playing = true;
		var imageLoop = setInterval(function(){

			// $('#slideshow-count').text("Image: " + (intervalCount + 1));
			// pixelPushImage("" + intervalCount);
			// intervalCount++;

			//pixelPushImage("5x5_" + i);

			
			if(i <= 3 && countdown) {
				prefix = "countdown_";
				i_sub = 1;
			}
			else if(i <= 6 && countdown) {
				prefix = "countdown_";
				i_sub = 2;
			}
			else if(i <= 9 && countdown) {
				prefix = "countdown_";
				i_sub = 3;
			}
			else if(i <= 12 && countdown) {
				prefix = "countdown_";
				i_sub = 4;
			}
			else if (i == 1) {
				prefix = "donut_blue_";
			}
			else if (i == 5) {
				prefix = "donut_red_";
				i_sub = 1;
			}
			else if (i == 9) {
				prefix = "donut_green_";
				i_sub = 1;
			}
			else if (i == 14 || i == 28 || i == 42 || i == 56 || i == 70) {
				//5x5 is wave green
				prefix = "5x5_";
				i_sub = 1;
			}
			else if (i == 84) {
				prefix = "first_transition_";
				i_sub = 1;
			}
			else if (i == 88 || i == 90 || i == 92 || i == 94 || i == 96) {
				prefix = "solid_";
				i_sub = 1;
			}
			else if (i == 98) {
				prefix = "checkerboard_";
				i_sub = 1;
			}
			else if (i == 101 || i == 103 || i == 105 || i == 107 || i == 109) {
				prefix = "checkerboard_";
				i_sub = 4;
			}
			else if (i == 111) {
				prefix = "last_transition_";
				i_sub = 1;
			}
			else if (i == 113 || i == 127) {
				prefix = "5x5_";
				i_sub = 1;
			}
			else if (i == 141)
			{
				prefix = "donut_blue_";
				i_sub = 1;
				i = 0;
			}
			
			
		
			imageID = prefix + i_sub;
			pixelPushImage(imageID);
			if(i == 12) {
				countdown = false;
				i = 0;
				i_sub = 0;
			}
			i_sub++;
			i++;

			if(intervalCount >= 14) {
				if(!stopLoop) {
					intervalCount = 0;
					playing = true;
				}
				else {
					clearInterval(imageLoop);
					intervalCount = 0;
					playing = false;
					stopLoop = false;
				}
			}

		}, 150);
	}

}


function pixelPushImage(image) {
	var parameters = {};
		parameters['api_name'] = 'photo';
		parameters['api_method'] = 'get_pixels';
		parameters['params'] = image;

		api_request(parameters, function(response){

				if(response['success'] == true) {
					console.log("Pixel Pulled");
				}
				else {
					console.log("Pixel NOT Pulled");
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
    var requestType = 'POST';

    //Check for the request type of POST or GET
    //This infers that the request type is a POST request
    //if not specified otherwise
    if (typeof(pars['request_type'])!='string'){
        requestType = 'POST';
    }
    else {
        requestType = pars['request_type'];
    }

    //Validate request before proceeding
    if (!typeof(pars['version']==='string')) { validRequest = false; }
    if (!typeof(pars['api_name']==='string')) { validRequest = false; }
    if (!typeof(pars['api_method']==='string')) { validRequest = false; }

    if (validRequest) {

        //Build request url
        var request_url = window.location.origin + '/api/' + pars['api_name'] + '/' +
            pars['api_method'] + '/' + pars['params'];

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
