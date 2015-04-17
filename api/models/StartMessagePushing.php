<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use addhawk\SpeedDisplay;

    require dirname(__DIR__) . '../../vendor/autoload.php';
    require 'SpeedDisplay.php';

    $server = IoServer::factory(
      new HttpServer(
        new WsServer(
          new SpeedDisplay()
        )
      ),
      8080
    );

    $server->run();
