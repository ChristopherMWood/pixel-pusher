<?php

class ApiRoutes extends Phalcon\Mvc\Router\Group
{
    public function initialize()
    {

        //Basic api route for pixelpusher
        $this->add(
            "/api/:action/:model/:params",
            array(
                "controller" => "api",
                "action" => 1,
                "model" => 2,
                "params" => 3,
            )
        );

    }
}