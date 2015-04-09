<?php

include "../app/models/base_api.php";

/*
This class is the base model for all api requests. 
This allows the code for each specific api to be simpler and 
just pull the request variables from here. With this design,
new API's can be built much quicker with cleaner dependencies.
*/
class AdminApi extends BaseApi
{
	/*	
	* This sets up the BaseModel class with data
	*/
	function __construct($request_obj, $response_obj) {
       parent::__construct($request_obj, $response_obj);
    }

    /*	
	* This executes the request sent in to the
	* constructor and uses fields from the parent
	* class. 
	* PRE-CONDITION: Request object must be set in parent class
	*/
    public function executeRequest() {
        if($this->method == "set_grid") {
        	return $this->setGrid();
        }
        else {
        	$this->response->setStatusCode(405, "Method Not Found");
			$this->response->setContent("<html><body>Hello</body></html>");
			return $this->response;
        }
    }

    /*
    * Test method for the api layout
    */
    private function setGrid() {
    	echo "In Set Grid";
    	return $this->response;
    }
}