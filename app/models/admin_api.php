<?php

include "../app/models/base_api.php";

/*
This class is the base model for all api requests. 
This allows the code for each specific api to be simpler and 
just pull the request variables from here. With this design,
new API's can be built much quicker with cleaner dependencies.
*/
class AdminApi extends BaseModel
{
	/*	
	* This sets up the BaseModel class with data
	*/
	function __construct($request_obj) {
       parent::__construct($request_obj);
    }

    /*	
	* This executes the request sent in to the
	* constructor and uses fields from the parent
	* class. 
	* PRE-CONDITION: Request object must be set in parent class
	*/
    public function executeRequest() {
        echo "Running Request";
    }
}