<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
// Use Loader() to autoload our model
$loader = new \Phalcon\Loader();
$loader->registerDirs(array(
    __DIR__ . '/models/'
))->register();
$di = new \Phalcon\DI\FactoryDefault();
//Set up the database service
$di->set('modelsManager', function(){
	return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
			"host" => "localhost",
			"username" => "addhawk",
			"password" => "addhawk4784",
			"dbname" => "addhawk"
	));
});
//Create new Micro application and router
$router = new Phalcon\Mvc\Micro($di);
/*
  This route MATCHES ALL VALID API REQUESTS to a model
  URL: :host/api/model/method/parameters
  HTTP Methods: { GET, POST }
  PRE: $model and $method can only contain letter, numbers, '-', and '_' symbols
  POST: Valid JSON Response is returned
*/
$router->map('/{model:[A-Za-z0-9_-]+}/{method:[A-Za-z0-9_-]+}/{paramData}', function($model, $method, $paramData) use ($router){
	//Build request obj
	include __DIR__."/lib/request.php";
  $paramList = explode("-", $paramData);
  // print_r($paramList);

	$request = new Request($model, $method, $paramList);

	//Prepare response obj
	$response = new Phalcon\Http\Response();
	$api_obj; //Pre define for if-else if block
	//Call corresponding API below if possible
  if($model == "user") {
		include __DIR__."/lib/user_api.php";
		$api_obj = new UserApi($request, $response, $router);
		$response = $api_obj->executeRequest();
	}
	else if($model == "admin") {
		include __DIR__."/lib/admin_api.php";
		$api_obj = new AdminApi($request, $response, $router);
		$response = $api_obj->executeRequest();
	}
  else if($model == "photo") {
		include __DIR__."/lib/photo_api.php";
		$api_obj = new PhotoApi($request, $response, $router);
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
$router->map('/{model}/{method}', function($model, $method){
  echo "PixelPusher API</br>";
  echo "Model: ".$model."</br>";
  echo "Method: ".$method;
});
//Incomplete api call catch
$router->map('/{model}', function($model){
  echo "PixelPusher API"."</br>";
  echo "Model: ".$model;
});
$router->handle();
