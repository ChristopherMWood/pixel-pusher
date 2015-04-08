<?php

// Use Loader() to autoload our model
$loader = new \Phalcon\Loader();

$di = new \Phalcon\DI\FactoryDefault();

$router = new \Phalcon\Mvc\Micro($di);


$router->get('/api/handler/{model}/{params}', function($model, $params){

	echo 'TEST RUN';
	echo $model;
	echo $params;
});


$router->handle();


