<?php

class ApiController extends \Phalcon\Mvc\Controller
{

    public function handlerAction()
    {
        //Pull in parameters
        echo "<h1>API Handler Entered</h1>";

        $model = $this->dispatcher->getParam("model");

        echo $model;

        //Choose correct api based off of api param
        if( $model == "grid" ) {
            echo 'grid';
        }
        else if ( $model == "admin" ) {
            echo 'admin';
        }
        else {
          //No valid api must have been found for request
        }

        //Return result from api call

        return true;
    }

}
