
document.getElementById("start-button").onclick = function() {
	var parameters = {};
    parameters['api_name'] = 'photo';
    parameters['api_method'] = 'get_pixels';
		parameters['params'] = "a1";

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
	}
}


var playing = false;
var intervalCount = 0;
function playSlideshow() {

	if(!playing) {
		playing = true;
		var imageLoop = setInterval(function(){

			$('#slideshow-count').text("Image: " + (intervalCount + 1));
			pixelPushImage("a" + intervalCount);
			intervalCount++;

			if(intervalCount >= 8) {
				clearInterval(imageLoop);
				intervalCount = 0;
				playing = false;
			}

		}, 1000);
	}

}


function pixelPushImage(image) {
	var parameters = {};
		parameters['api_name'] = 'photo';
		parameters['api_method'] = 'get_pixels';
		parameters['params'] = "a1";

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
