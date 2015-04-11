<?php

/*
  This route group catches and processes all ADMIN routes
  Any admin pages and views will be found through here.
*/


$router->get('/admin', function(){
  echo "<h1>Admin</h1>";
});
