<?php

include "base_api.php";

/*
This class is the base model for all api requests.
This allows the code for each specific api to be simpler and
just pull the request variables from here. With this design,
new API's can be built much quicker with cleaner dependencies.
*/
class PhotoApi extends BaseApi
{
	/*
	* This sets up the BaseModel class with data
	*/
	function __construct($request_obj, $response_obj, $app) {
       parent::__construct($request_obj, $response_obj, $app);
  }

    /*
	* This executes the request sent in to the
	* constructor and uses fields from the parent
	* class.
	* PRE-CONDITION: Request object must be set in parent class
	*/
    public function executeRequest() {
        if($this->method == "get_pixels") {
        	return $this->getPixels();
        }
        if($this->method == "get_seat_pixel") {
        	return $this->getSeatPixel();
        }
        else {
        	$this->response->setStatusCode(405, "Method Not Found");
					return $this->response;
        }
    }

    /*
    * Test method for the api layout
    */
    private function getPixels() {
			try {

				$imageName = $this->parameters[0];
				$connection = new \Phalcon\Db\Adapter\Pdo\Mysql(array(
						"host" => "localhost",
						"username" => "addhawk",
						"password" => "addhawk4784",
						"dbname" => "addhawk"
				));
			 //Reconnect
			 $connection->connect();
				$pixels = array();
		for ($x = 0; $x < 3; $x++)
		{
			for ($y = 0; $y < 3; $y++)
			{
				 $pixels[(string)$x."-".(string)$y] = array();
				 $phql = "SELECT r_val, g_val, b_val FROM pixel where image='$imageName' and x_pos='$x' and y_pos='$y'";
				 $result = $connection->query($phql);
				 $result->setFetchMode(Phalcon\Db::FETCH_NUM);
				  //$this->data['seat'];
				 $rawPixels = $result->fetchArray();
					//$pixels[(string)$x."-".(string)$y] = $result->fetchArray();
				 $pixels[(string)$x."-".(string)$y]['r_val'] = $rawPixels[0];
				 $pixels[(string)$x."-".(string)$y]['g_val'] = $rawPixels[1];
				 $pixels[(string)$x."-".(string)$y]['b_val'] = $rawPixels[2];
				 //echo '<pre>' . var_dump($seat) . '</pre>';
			}
		}

		for ($x = 0; $x < 3; $x++)
		{
			for($y = 0; $y < 3; $y++) {
				$content = array('category' => $x.'-'.$y, 'data' => json_encode($pixels[$x.'-'.$y]));
				$context = new ZMQContext();
				$socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my pusher');
				$socket->connect("tcp://127.0.0.1:5555");
				$socket->send(json_encode($content));
			}
		}

			$this->response->setJsonContent(array('success' => true, 'image-loaded' => $imageName, 'data' => $pixels));

			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $pixels));
			}
    	return $this->response; //Supply response
    }

    /*
    * Test method for the api layout
    */
    private function getSeatPixel() {
			try {
				$connection = new \Phalcon\Db\Adapter\Pdo\Mysql(array(
						"host" => "localhost",
						"username" => "addhawk",
						"password" => "addhawk4784",
						"dbname" => "addhawk"
				));
			 //Reconnect
			 $connection->connect();
				$xp = $this->parameters[0];
				$yp = $this->parameters[1];
				//var_dump($xp);
			 $phql = "SELECT * FROM pixel where image='1a' and x_pos='$xp' and y_pos='$yp'";
			 $result = $connection->query($phql);
			 $result->setFetchMode(Phalcon\Db::FETCH_NUM);
			  //$this->data['seat'];
				$seat = $result->fetchArray();
			 //var_dump($seat);
				$this->data['x_pos'] = $seat[0];
				$this->data['y_pos'] = $seat[1];
				$this->data['image'] = $seat[2];
				$this->data['r_val'] = $seat[3];
				$this->data['g_val'] = $seat[4];
				$this->data['b_val'] = $seat[5];

				// $content = array('category' => "".$xp.$yp, 'data' => json_encode($this->data['seat']));
				// $context = new ZMQContext();
				// $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my pusher');
				// $socket->connect("tcp://127.0.0.1:5555");
				// $socket->send(json_encode($content));

				$this->response->setJsonContent(array('success' => true, 'data' => $this->data));
			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
			}
    	return $this->response; //Supply response
    }

}
