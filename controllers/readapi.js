var http = require('http');

var makeAPICall = function(token, queryParams, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'api.brightcove.com'
    , port: 80
    , path: '/services/library?token=' + token
  };

  for(var param in queryParams)
  {
    options.path += '&' + param + '=' + queryParams[param];
  }

  console.log(options.path);

  http.get(options, function(res){
    res.on('data', function(data){
      apiResponse += data;
    }).on('end', function(){
      callback(apiResponse);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  })
};

var getVideoById = function(token, videoID, callback){
  var options = {
    command: 'find_video_by_id'
    , video_id: videoID
  };

  makeAPICall(token, options, function(apiResponse){
    callback(apiResponse);
  });
};

exports.getVideoById = getVideoById;