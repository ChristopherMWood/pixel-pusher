<?php
class BaseModel
{
	public $request;
	public $model;
	public $method;
	public $params;

	function __construct($request) {
    	echo "baseapi call";
    }

    //Print representation of BaseModel setup
    public function displayModelSetup() {
        echo "Display setup";
    }
}