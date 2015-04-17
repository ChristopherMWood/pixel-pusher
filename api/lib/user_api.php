<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');
include "base_api.php";

/*
This class is the base model for all api requests.
This allows the code for each specific api to be simpler and
just pull the request variables from here. With this design,
new API's can be built much quicker with cleaner dependencies.
*/
class UserApi extends BaseApi
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
        if($this->method == "register_position") {
        	return $this->registerPosition();
        }
        else {
        	$this->response->setStatusCode(405, "Method Not Found");
					return $this->response;
        }
    }

    /*
    * Test method for the api layout
    */
    private function registerPosition() {
			try {
				echo "REGISTERING POSITION";

				$entryData = array(
        'category' => "kittens"
      , 'when'     => time()
    	);

			$this->data['responseData'] = $entryData;


				// $number_of_parameter = ($this->request->parameters);
				//
				// if($number_of_parameters != 3) {
				//
				// 	$this->data['title'] = "Position Not Registered";
				// 	$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
				// 	return $this->response; //Supply response
				// }

				// $this->data['title'] = "Registered Position";
				// $this->data['section'] = $this->request->parameters[0];
				// $this->data['row'] = $this->request->parameters[1];
				// $this->data['column'] = $this->request->parameters[2];
				// $this->response->setJsonContent(array('success' => true, 'data' => $this->data));
				//
				$context = new ZMQContext();
		    $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'my pusher');
		    $socket->connect("tcp://104.131.45.86:5555");

		    $socket->send(json_encode($entryData));
				echo "THIS WORKED?";
				return $this->response; //Supply response

			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
			}

    }

		private function unregisterPosition() {
			try {

				$this->data['title'] = "Registered Position";
				$this->response->setJsonContent(array('success' => true, 'data' => $this->data));

				return $this->response; //Supply response

			} catch (Exception $e) {
				$this->data['error'] = $e->getMessage();
				$this->response->setJsonContent(array('success' => false, 'data' => $this->data));
			}
		}
}
