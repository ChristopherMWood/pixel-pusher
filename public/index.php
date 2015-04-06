<?php

//Include all routes on site
foreach (glob("../app/routes/*.php") as $filename)
{
    include $filename;
}

foreach (glob("../app/controllers/*.php") as $filename)
{
    include $filename;
}

//Create routes and initialize routes
$router = new \Phalcon\Mvc\Router();

$router->mount(new PublicRoutes());
$router->mount(new ApiRoutes());
$router->mount(new AdminRoutes());

$router->handle();

$controller = $router->getControllerName();
$action = $router->getActionName();
$params = $router->getParams();

$di = new \Phalcon\DI\FactoryDefault();

$d = new Phalcon\Mvc\Dispatcher();
$d->setDI($di);
$d->setControllerName($router->getControllerName());
$d->setActionName($router->getActionName());
$d->setParams($router->getParams());

foreach ($params as $term)
    echo $term;

$controller = $d->dispatch();
