<?php

$router = new \Phalcon\Mvc\Router();

$router->add(
    "/pixelpusher/api/v1/",
    array(
        "controller" => "ApiController",
        "action" => "apiHandler"
    )
);

$router->handle();