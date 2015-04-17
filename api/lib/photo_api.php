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
				$connection = new \Phalcon\Db\Adapter\Pdo\Mysql(array(
						"host" => "localhost",
						"username" => "addhawk",
						"password" => "addhawk4784",
						"dbname" => "addhawk"
				));
			 //Reconnect
			 $connection->connect();
		for ($x = 0; $x < 6; $x++)
		{
			for ($y = 0; $y < 6; $y++)
			{
				 $phql = "SELECT * FROM pixel where image='1a' and x_pos='$x' and y_pos='$y'";
				 $result = $connection->query($phql);
				 $result->setFetchMode(Phalcon\Db::FETCH_NUM);
				  $this->data['admin'];
					$admin = $result->fetchArray();
				 echo '<pre>' . var_dump($admin) . '</pre>';
			}
		}
			 $phql = "SELECT * FROM pixel where image='1a'";
			 $result = $connection->query($phql);
			 $result->setFetchMode(Phalcon\Db::FETCH_NUM);
			  $this->data['admin'];
				$admin = $result->fetchArray();
			 var_dump($admin);
				$this->data['x_pos'] = $admin[0];
				$this->data['y_pos'] = $admin[1];
				$this->data['image'] = $admin[2];
				$this->data['r_val'] = $admin[3];
				$this->data['g_val'] = $admin[4];
				$this->data['b_val'] = $admin[5];

				$output = array();
				foreach($data as $v) {
				    $output[key($v)] = current($v);
				}
				echo json_encode($output, 128);

				$content = array('category' => 'all', 'data' => json_encode($this->data));

				$context = new ZMQContext();
				$socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my pusher');
				$socket->connect("tcp://127.0.0.1:5555");

				$socket->send(json_encode($content));


				$this->response->setJsonContent(array('success' => true, 'data' => $this->data));
			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
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
				var_dump($xp);
			 $phql = "SELECT * FROM pixel where image='1a' and x_pos='$xp' and y_pos='$yp'";
			 $result = $connection->query($phql);
			 $result->setFetchMode(Phalcon\Db::FETCH_NUM);
			  $this->data['admin'];
				$admin = $result->fetchArray();
			 //var_dump($admin);
				$this->data['x_pos'] = $admin[0];
				$this->data['y_pos'] = $admin[1];
				$this->data['image'] = $admin[2];
				$this->data['r_val'] = $admin[3];
				$this->data['g_val'] = $admin[4];
				$this->data['b_val'] = $admin[5];

				$this->response->setJsonContent(array('success' => true, 'data' => $this->data));
			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
			}
    	return $this->response; //Supply response
    }

}
