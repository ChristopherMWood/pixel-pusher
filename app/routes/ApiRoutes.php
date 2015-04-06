<?php

class ApiRoutes extends Phalcon\Mvc\Router\Group
{
    public function initialize()
    {

        //Basic api route for pixelpusher
        $this->add(
            "/api/{model}/{params}",
            array(
                "controller" => "api",
                "action" => "handler",
            )
        );

    }
}