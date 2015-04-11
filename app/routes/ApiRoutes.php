<?php

/*
  This route group catches and processes all API calls on the system
  Any new api matching url rules should be added below.
*/


/*
  This route MATCHES ALL VALID API REQUESTS to a model
  URL: :host/api/model/method/parameters
  HTTP Methods: { GET, POST }
  PRE: $model and $method can only contain letter, numbers, '-', and '_' symbols
  POST: Valid JSON Response is returned
*/
$router->map('/api/{model:[A-Za-z0-9_-]+}/{method:[A-Za-z0-9_-]+}/{parameters}', function($model, $method, $parameters){

	//Build request obj
	include "../app/models/request.php";
	$request = new Request($model, $method, $parameters);

	//Prepare response obj
	$response = new Phalcon\Http\Response();

	$api_obj; //Pre define for if-else if block

	//Call corresponding API below if possible
  if($model == "user") {
		include "../app/models/user_api.php";
		$api_obj = new UserApi($request, $response);
		$response = $api_obj->executeRequest();
	}
	else if($model == "admin") {
		include "../app/models/admin_api.php";
		$api_obj = new AdminApi($request, $response);
		$response = $api_obj->executeRequest();
	}
	else {
		$response->setStatusCode(405, "Model Not Found");
	}

	//Send response from api
	$response->send();
});


/*
  The routes below catch all invalid api calls
  HTTP Methods: { GET, POST }
*/
$router->map('/api/{model}/{method}', function($model, $method){
  echo "PixelPusher API</br>";
  echo "Model: ".$model."</br>";
  echo "Method: ".$method;
});

//Incomplete api call catch
$router->map('/api/{model}', function($model){
  echo "PixelPusher API"."</br>";
  echo "Model: ".$model;
});

//Incomplete api call catch
$router->map('/api', function(){
  echo "PixelPusher API"."</br>";
});
