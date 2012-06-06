//----------------------------------------------------------------------------------------- INIT
var http = require('http');
var readapi = require('../controllers/readapi.js');
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- PRIVATE
var _makeAPICall = function(req, path, callback){
  var apiResponse = ''
  , options = { //get a user's gists
    host: 'data.brightcove.com'
    , port: 80
    , path: path
    , headers: {'Authorization': 'Bearer ' + req.params.token}
  };

  options.path += getQueryParams(req);  

  http.get(options, function(res){
    res.on('data', function(data){
      apiResponse += data;
    }).on('end', function(){
      try {
        apiResponse = JSON.parse(apiResponse);
      } catch(e) {
        apiResponse = { error: apiResponse };
      }

      callback(apiResponse);
    });
  }).on('error', function(error) {
    console.log("HTTP Get Error: " + Error.message);
  });
};

var getQueryParams = function(req, path){
  var queryParams = [];

  //only enters this block if one or both of the to and from request params were populated
  if(req.query.to || req.query.from)
  {
    //because of these defaults, the from time is optional (defaults to unix epoch) and 
    //to time is optional (defaults to current time)
    var fromTime = 0
    , toTime = new Date().getTime();

    if(req.query.to)
    {
      toTime = req.query.to;
    }

    if(req.query.from)
    {
      fromTime = req.query.from;
    }

    queryParams.push('from=' + fromTime);
    queryParams.push('to=' + toTime);
  }

  if(req.query.sort)
  {
    queryParams.push('sort=' + req.query.sort);
  }

  if(req.query.limit)
  {
    queryParams.push('limit=' + req.query.limit);
  }

  if(req.query.skip)
  {
    queryParams.push('skip=' + req.query.skip);
  }

  if(queryParams.length > 0)
  {
    return '?' + queryParams.join('&');
  }

  return '';
}
//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------- PUBLIC
var getAccount = function(req, callback){
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId;
  _makeAPICall(req, path, callback);
};

var getPlayer = function(req, callback) {
  if(!req.params.playerId)
  {
    var error = {'Error' : 'When fetching player data, the player ID is required.'};
  }

  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/player/' + req.params.playerId;

  _makeAPICall(req, path, callback);
};

var getVideoInPlayer = function(req, callback){
var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + 
  '/video/' + req.params.videoId + 
  '/player/' + req.params.playerId;

  _makeAPICall(req, path, function(apiResponse){
    //if the read api token was included, make a request for that information 
    //and add it to the response before sending it back
    if(apiResponse.video && req.query.readAPIToken)
    {
      readapi.getVideoById(req, req.params.videoId, function(err, readApiResponse){
        if(!readApiResponse.error)
        {
          apiResponse.video_data = readApiResponse;
        }

        callback(apiResponse);
      });
    }
    else
    {
      callback(apiResponse);
    }
  });
};

var getAllPlayers = function(req, callback) {
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/player';
  _makeAPICall(req, path, callback);
};

var getVideo = function(req, callback) {
  if(!req.params.playerId)
  {
    var error = {'Error' : 'When fetching player data, the player ID is required.'};
  }  

  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/video/' + req.params.videoId;

  _makeAPICall(req, path, function(apiResponse){
    //if the read api token was included, make a request for that information 
    //and add it to the response before sending it back
    if(apiResponse.video && req.query.readAPIToken)
    {
      readapi.getVideoById(req, apiResponse.video, function(err, readApiResponse){
        if(!readApiResponse.error)
        {
          apiResponse.video_data = readApiResponse;
          return;
        }

        callback(apiResponse);
      });
    }
    else
    {
      callback(apiResponse);
    }
  });
};

var getAllVideos = function(req, callback){
  var path = '/analytics-api/data/videocloud/account/' + req.params.publisherId + '/video';

  //setting a default limit of 10 if none is specified
  if(!req.query.limit)
  {
    req.query.limit = 10;
  }

  _makeAPICall(req, path, function(apiResponse){
    if(apiResponse.video && req.query.readAPIToken)
    {
      readapi.getVideoById(req, apiResponse.video, function(readApiResponse){
        if(!readApiResponse.error)
        {
          apiResponse.video_data = readApiResponse;
        }

        callback(apiResponse);
      });
    }
    else if(apiResponse.length > 0 && parseInt(req.query.limit) <= 10) //we don't want to be making a request for more than 10 videos - it's slow enough as it is
    {
      var videoIds = [];

      for(var i = 0; i < apiResponse.length; i++)
      {
        videoIds.push(apiResponse[i].video);
      }

      if(videoIds.length > 0)
      {
        readapi.getVideosByIds(req, videoIds, function(readApiResponse){
          if(readApiResponse.error)
          {
            callback(readApiResponse);
            return;
          }

          for(var i = 0; i < readApiResponse.items.length; i++)
          {
            var videoData = readApiResponse.items[i];
            
            for(var j = 0; j < apiResponse.length; j++)
            {
              if(parseInt(apiResponse[j].video) == videoData.id)
              {
                apiResponse[j].video_data = videoData;
              }
            }
          }

          callback(apiResponse);
        });
      }
    }
    else
    {
      callback(apiResponse);
    }
  });
};
//-----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------- EXPORTS
exports.getAccount = getAccount;
exports.getPlayer = getPlayer;
exports.getAllPlayers = getAllPlayers;
exports.getVideoInPlayer = getVideoInPlayer;
exports.getAllVideos = getAllVideos;
exports.getVideo = getVideo;


