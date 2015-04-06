<?php

class AdminRoutes extends Phalcon\Mvc\Router\Group
{
    public function initialize()
    {

        //Basic api route for pixelpusher
        $this->add(
            "/admin/:page",
            array(
                "controller" => "admin",
                "action" => 1,
            )
        );

    }
}