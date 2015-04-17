<?php

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
       parent::__construct($request_obj, $response_obj);
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

				$this->data['TestData'] = "Yay It Worked!!!";

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
				// $context = new ZMQContext();
		    // $socket = $context->getSocket(ZMQ::SOCKET_PUSH, 'New PixelPusher');
		    // $socket->connect("tcp://www.pixelpush.us:5555");
				//
		    // $socket->send(json_encode($this->data));

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
