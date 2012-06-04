var http = require('http');

var makeAPICall = function(token, path, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'api.brightcove.com'
    , port: 80
    , path: '/services/library?token=' + token
  };

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

var getVideoById = function(videoID, readToken){
  
};

exports.getVideoById = getVideoById;