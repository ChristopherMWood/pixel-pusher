<?php

class BaseApi
{
	protected $request;
  protected $response;
	protected $model;
	protected $method;
	protected $params;
	protected $app;

    //This is the reponse data to be parsed into JSON and returned
    protected $data;

	function __construct($request_obj, $response_obj, $appRef) {
    	$this->request = $request_obj;
				$this->app = $appRef;
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
