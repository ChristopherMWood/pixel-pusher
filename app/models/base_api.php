<?php
class BaseApi
{
	protected $request;
    protected $response;
	protected $model;
	protected $method;
	protected $params;

    //This is the reponse data to be parsed into JSON and returned
    protected $data;

	function __construct($request_obj, $response_obj) {
    	$this->request = $request_obj;
        $this->response = $response_obj;
        $this->model = $request_obj->model;
        $this->method = $request_obj->method;
        $this->parameters = $request_obj->parameters;
    }

    //Print representation of BaseModel setup
    public function displayModelSetup() {
        echo "Display setup";
    }
}