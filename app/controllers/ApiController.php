<?php

class ApiController extends \Phalcon\Mvc\Controller
{

    public function handlerAction()
    {
        //Pull in parameters
        echo "<h1>API Handler Entered</h1>";

        $api = $this->dispatcher->getParam("model");
        $params = $this->dispatcher->getParam("params");

        echo "Test".$api."Test";

        //Choose correct api based off of api param
        if( $api == "grid" ) {
            echo 'grid';
        }
        else if ( $api == "admin" ) {
            echo 'admin';
        }
        else {
          //No valid api must have been found for request
        }

        //Return result from api call

        return true;
    }

}
