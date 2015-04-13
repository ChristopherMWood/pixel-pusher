<?php

class Request
{
	public $model;
	public $method;
	public $parameters;

	/*
	* This sets up the BaseModel class with data
	*/
	function __construct($model, $method, $parameters) {
       $this->model = $model;
       $this->method = $method;
       $this->parameters = $parameters;
    }
}
