<?php

//Use Loader() to autoload our model
$loader = new \Phalcon\Loader();
$di = new \Phalcon\DI\FactoryDefault();
$router = new \Phalcon\Mvc\Micro($di);

$router->get('/api/{model}/{method}/{parameters}', function($model, $method, $parameters){
	
	//Build request obj
	include "../app/models/request.php";
	$request = new Request($model, $method, $parameters);

	//Prepare response obj
	$response = new Phalcon\Http\Response();

	$api_obj; //Pre define for if-else if block

	//Call corresponding API below if possible
	if($model == "admin") {
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

$router->handle();

