<?php

// Use Loader() to autoload our model
$loader = new \Phalcon\Loader();

$di = new \Phalcon\DI\FactoryDefault();

$router = new \Phalcon\Mvc\Micro($di);


$router->get('/api/{model}/{function}', function($model, $function){
	
	//Prepare response for each request
	$request = "Placeholder";
	$response = new Phalcon\Http\Response();
	$api_obj;

	if($model == "admin") {
		include "../app/models/admin_api.php";
		$api_obj = new AdminApi($request);
		$api_obj->executeRequest();
	}
	else {
		
		$response->setStatusCode(200, "OK");
		$response->setContent("<html><body>Hello</body></html>");
		$response->send();
	}



});

$router->handle();


