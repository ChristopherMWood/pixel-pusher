function getRanges() {
  var parameters = {};
    parameters['api_name'] = 'user';
    parameters['api_method'] = 'register_position';
    parameters['seat'] = 'Test Value';

    api_request(parameters, function(response){
        if(response['success'] == true) {
          var x = response['data']['x_range'];
          var y = response['data']['x_range'];

          alert(x + " " + y);
        }
        else {
            alert('api called failed');
        }
    });
}
