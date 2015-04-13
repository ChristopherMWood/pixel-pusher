function registerSeat() {
  var parameters = {};
    parameters['api_name'] = 'user';
    parameters['api_method'] = 'register_position';
    parameters['seat'] = 'Test Value';

    api_request(parameters, function(response){
        if(response['success'] == true) {
            //Setup websocket connection here

        }
        else {
            alert('api called failed');
        }
    });
}
