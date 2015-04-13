<?php
use \Phalcon\Mvc\Dispatcher;
try {
    //Register an autoloader
    $loader = new \Phalcon\Loader();
    $loader->registerDirs(array(
                'app/controllers/',
                'app/models/'
    ))->register();

    //Create a DI
    $di = new Phalcon\DI\FactoryDefault();
    //Setup the view component
    $di->set('view', function(){
        $view = new \Phalcon\Mvc\View();
        $view->setViewsDir('app/views/');
        return $view;
    });
//     //Setup the database service
//     $di->set('db', function(){
//         return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
//             "host" => "localhost",
//             "username" => "addhawk",
//             "password" => "addhawk4784",
//             "dbname" => "addhawk"
//         ));
//     });
//     $di->set(
//     'dispatcher',
//     function() use ($di) {
//         $eventsManager = $di->getShared('eventsManager');
//         $eventsManager->attach(
//             'dispatch:beforeException',
//             function($event, $dispatcher, $exception) {
//                 switch ($exception->getCode()) {
//                     case Dispatcher::EXCEPTION_HANDLER_NOT_FOUND:
//                     case Dispatcher::EXCEPTION_ACTION_NOT_FOUND:
//                         $dispatcher->forward(
//                             array(
//                                 'controller' => 'error',
//                                 'action' => 'error404',
//                             )
//                         );
//                         return false;
//                         break; // for checkstyle
//                     default:
//                         $dispatcher->forward(
//                             array(
//                                 'controller' => 'error',
//                                 'action' => 'error404',
//                             )
//                         );
//                         return false;
//                         break; // for checkstyle
//                 }
//             }
//         );
//         $dispatcher = new Dispatcher();
//         $dispatcher->setEventsManager($eventsManager);
//         return $dispatcher;
//     },
//     true
// );
    //Handle the request
    $app = new \Phalcon\Mvc\Application($di);
    echo $app->handle()->getContent();

} catch(\Phalcon\Exception $e) {
     echo "PhalconException: ", $e->getMessage();
}
