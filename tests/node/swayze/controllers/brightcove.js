var http = require('http');

var setHeader = function(res, token){
  res.setHeader('Authorization: Bearer', token);
};

var getAccount = function(publisherID, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'data.brightcove.com'
    , port: 80
    , path: '/analytics-api/data/videocloud/account/' + publisherID
    , headers: {'Authorization': 'Bearer 14fc90987e4b0eeebd29e5ed3'}
  };

  http.get(options, function(res){
    console.dir(res);
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

exports.getAccount = getAccount;
// exports.getVideo = getVideo;