<?php

//Create new Micro application and router
$app = new Phalcon\Mvc\Micro();
$di = new \Phalcon\DI\FactoryDefault();

//Setup router
$router = new \Phalcon\Mvc\Micro($di);

//In charge of routing to 404 path
$router->notFound(function () use ($app) {
  echo "<h1>404</h1>";
  $view = new Phalcon\Mvc\View\Simple();
  echo $view->render('../app/views/errors/404', array('content' => "DAMN"));
});

//Include all routes on site
foreach (glob("../app/routes/*.php") as $filename)
{
    include $filename;
}

$router->handle();
