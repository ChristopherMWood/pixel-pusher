<?php

// Use Loader() to autoload our model
$loader = new \Phalcon\Loader();

$di = new \Phalcon\DI\FactoryDefault();

$router = new \Phalcon\Mvc\Micro($di);

//Api base url for testing
$router->get('/api', function(){
	echo "BASE API PAGE";
});

$router->get('/api/{model}', function($model){
	echo "Model: ".$model;
});

$router->get('/api/{model}/{function}', function($model, $function){
	
	if($model == "admin") {
		echo "Calling Admin Model";
	}
	else {
		echo "Error: No valid API found";
	}

});

$router->handle();


