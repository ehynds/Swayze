//----------------------------------------------------------------------------------------- INIT
var http = require('http');
var readapi = require('../controllers/readapi.js');
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- PRIVATE
var _makeAPICall = function(token, path, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'data.brightcove.com'
    , port: 80
    , path: path
    , headers: {'Authorization': 'Bearer ' + token}
  };

  http.get(options, function(res){
    res.on('data', function(data){
      apiResponse += data;
    }).on('end', function(){
      callback(apiResponse);
    });
  }).on('error', function(error) {
    console.log("HTTP Get Error: " + Error.message);
  });
};
//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------- PUBLIC
var getAccount = function(req, callback){
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId;
  _makeAPICall(req.params.token, path, function(apiResponse){
    callback(apiResponse);
  });
};

var getPlayer = function(req, callback) {
  if(!req.params.playerId)
  {
    var error = {'Error' : 'When fetching player data, the player ID is required.'};
  }

  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/player/' + req.params.playerId;

  _makeAPICall(req.params.token, path, function(apiResponse){
    callback(apiResponse);
  });
};

var getAllPlayers = function(req, callback) {
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/player';

  _makeAPICall(req.params.token, path, function(apiResponse){
    callback(apiResponse);
  });
};

var getVideo = function(req, callback) {
  if(!req.params.playerId)
  {
    var error = {'Error' : 'When fetching player data, the player ID is required.'};
  }

  var timeRange = '';
  //only enters this block if one or both of the to and from request params were populated
  if(req.params.toTime || req.params.fromTime)
  {
    //because of these defaults, the from time is optional (defaults to unix epoch) and 
    //to time is optional (defaults to current time)
    var fromTime = 0
    , toTime = new Date().getTime();

    if(req.params.toTime)
    {
      toTime = req.params.toTime;
    }

    if(req.params.fromTime)
    {
      fromTime = req.params.fromTime;
    }

    timeRange = '?from=' + fromTime + '&to=' + toTime;
  }

  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/video/' + req.params.videoId + timeRange;

  _makeAPICall(req.params.token, path, function(apiResponse){
    var analyticsApiResponse = JSON.parse(apiResponse); //have to convert this first so we can read info in it

    //if the read api token was included, make a request for that information 
    //and add it to the response before sending it back
    if(analyticsApiResponse.video && req.query.readAPIToken)
    {
      readapi.getVideoById(req, analyticsApiResponse.video, function(readApiResponse){
        analyticsApiResponse.video_data = JSON.parse(readApiResponse);
        callback(analyticsApiResponse);
      });
    }
    else
    {
      callback(analyticsApiResponse);
    }
  });
};

var getAllVideos = function(req, callback){
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/video';

  _makeAPICall(req.params.token, path, function(apiResponse){
    callback(apiResponse);
  });
};
//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------- EXPORTS
exports.getAccount = getAccount;
exports.getPlayer = getPlayer;
exports.getAllPlayers = getAllPlayers;
exports.getAllVideos = getAllVideos;
exports.getVideo = getVideo;


