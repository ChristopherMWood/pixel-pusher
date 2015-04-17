//This is the single websocket for each user
var conn;

/*
This will register a seat the user chose with a
socket on the backend server.
*/
function registerSeatSocket() {

  //Required for subscription name
  var row, column;

  conn = new ab.Session('ws://www.pixelpush.us:8080',
      function() {
          conn.subscribe('testCategory', function(topic, data) {
              //This is where all of the pixels are pulled into on each
              //push from the server for a registerd user.

              //Parse Pixels Into display


              console.log('New Pixel Pushed "' + topic + '" : ' + data.title);
          });
      },
      function() {
          //Display closed message here if necessary
          //This should be a GUI change, not console change for final version
          console.warn('WebSocket connection closed');
      },
      {'skipSubprotocolCheck': true}
  );
}

/*
This closes the seatsocket for the user to allow for
a new socket or closing of the browser.
*/
function unregisterSeatSocket() {
  if(conn) {
    conn.close();
  }
}
