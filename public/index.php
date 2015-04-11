<?php

//Create new Micro application and router
$app = new Phalcon\Mvc\Micro();
$di = new \Phalcon\DI\FactoryDefault();
$router = new \Phalcon\Mvc\Micro($di);

//Include all routes on site
foreach (glob("../app/routes/*.php") as $filename)
{
    include $filename;
}

$router->handle();
