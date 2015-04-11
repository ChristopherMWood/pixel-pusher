<?php

$router->get('/public', function(){
  echo "<h1>Public</h1>";
});

// $router->get('/publasdfdasic', function() {
//  $view = new Phalcon\Mvc\View();
//  $view->setViewsDir('app/views/');
//
//  $view->start();
//  //Shows recent posts view (app/views/posts/recent.phtml)
//  $view->render('public', "home");
//  $view->finish();
//
//  //Printing views output
//  echo $view->getContent();
// });
