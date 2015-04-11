<?php

//Create new Micro application and router
$app = new Phalcon\Mvc\Micro();
$di = new \Phalcon\DI\FactoryDefault();

//Setup router
$router = new \Phalcon\Mvc\Micro($di);

//In charge of routing to 404 path
$router->notFound(function () use ($app) {
  echo file_get_contents('404.html', true);
});

//Include all routes on site
foreach (glob("../app/routes/*.php") as $filename)
{
    include $filename;
}

$router->handle();
