<?php
use Ratchet\Server\IoServer;
use addhawk\SpeedDisplay;

    require dirname(__DIR__) . '../../vendor/autoload.php';

    $server = IoServer::factory(
        new SpeedDisplay(),
        8080
    );

    $server->run();
