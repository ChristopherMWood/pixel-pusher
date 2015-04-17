<?php
namespace addhawk;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\WampServerInterface;

class Pusher implements WampServerInterface {

    protected $registeredSeats = array();

    public function onBlogEntry($entry) {
     $entryData = json_decode($entry, true);

     $topic = $this->subscribedTopics[$entryData['test-key']];

     // re-send the data to all the clients subscribed to that category
     $topic->broadcast($entryData);
 }


    public function onSubscribe(ConnectionInterface $conn, $seat) {
      $this->registeredSeats['test-key'] = $seat;
    }

    public function onUnSubscribe(ConnectionInterface $conn, $topic) {
    }

    public function onOpen(ConnectionInterface $conn) {
    }

    public function onClose(ConnectionInterface $conn) {
    }

    public function onCall(ConnectionInterface $conn, $id, $topic, array $params) {
        // In this application if clients send data it's because the user hacked around in console
        $conn->callError($id, $topic, 'You are not allowed to make calls')->close();
    }

    public function pushPixels($conn, $pixels) {

    }

    public function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible) {
        // In this application if clients send data it's because the user hacked around in console
        $conn->close();
    }
    public function onError(ConnectionInterface $conn, \Exception $e) {
    }
}
