<?php

class PublicController extends \Phalcon\Mvc\Controller
{

    public function show404Action()
    {
        echo "404 REACHED";
        $this->response->setStatusCode(404, 'Not Found');
        $this->view->pick('errors/404');
    }

}
