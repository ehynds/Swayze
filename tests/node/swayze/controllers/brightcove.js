var http = require('http');

var makeAPICall = function(token, path, additionalID, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'data.brightcove.com'
    , port: 80
    , path: path + additionalID
    , headers: {'Authorization': 'Bearer ' + token}
  };

  http.get(options, function(res){
    res.on('data', function(data){
      apiResponse += data;
    }).on('end', function(){
      callback(apiResponse);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

  return apiResponse;
};

var getAccount = function(token, publisherID, callback){
  makeAPICall(token, '/analytics-api/data/videocloud/account/', publisherID, function(apiResponse){
    callback(apiResponse);
  });
};

var getPlayer = function(token, playerID, callback) {

};

exports.getAccount = getAccount;
// exports.getVideo = getVideo;