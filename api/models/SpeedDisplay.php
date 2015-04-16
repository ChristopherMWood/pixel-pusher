<?php
require __DIR__ . '/vendor/autoload.php';

namespace addhawk;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class SpeedDisplay implements MessageComponentInterface {
    public function onOpen(ConnectionInterface $conn) {
    }

    public function onMessage(ConnectionInterface $from, $msg) {
    }

    public function onClose(ConnectionInterface $conn) {
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
    }
}
