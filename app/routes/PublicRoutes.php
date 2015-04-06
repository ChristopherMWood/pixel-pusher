<?php

class PublicRoutes extends Phalcon\Mvc\Router\Group
{
    public function initialize()
    {

        //Basic api route for public views
        $this->add(
            "/:page",
            array(
                "controller" => "public",
                "action" => 1,
            )
        );

    }
}