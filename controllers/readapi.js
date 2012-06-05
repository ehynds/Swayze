//----------------------------------------------------------------------------------------- INIT
var http = require('http');
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- PRIVATE
var _videoFields = ['id'
  , 'name'
  , 'shortDescription'
  , 'thumbnailURL'
  , 'videoStillURL'
  , 'renditions'
  , 'creationDate'
  , 'publishedDate'
  , 'customFields'
  , 'tags'
  , 'length'
  , 'playsTotal'
  , 'playsTrailingWeek'
];

var _makeAPICall = function(token, queryParams, callback){
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

var getVideoFields = function(req){
  if(!req.query.videoFields)
  {
    return _videoFields;
  }
  else
  {
    if(req.query.updateVideoFields == 'true')
    {
      var updatedVideoFields = _videoFields.slice(0);
      var queryVideoFields = req.query.videoFields.split(',');

      for(var i = 0; i < queryVideoFields.length; i++)
      {
        var queryVideoField = queryVideoFields[i];
        var matchedField = false;

        for(var j = 0; j < queryVideoFields.length; j++)
        {
          var videoField = _videoFields[j];
          if(queryVideoField == videoField)
          {
            matchedField = true;
          }
        }

        if(!matchedField)
        {
          updatedVideoFields.push(queryVideoField);
        }
      }

      return updatedVideoFields;
    }

    return req.query.videoFields;
  }

  return _videoFields;
};
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- PUBLIC
var getVideoById = function(req, videoID, callback){
  var options = {
    command: 'find_video_by_id'
    , video_id: videoID
    , video_fields: getVideoFields(req)
  };

  _makeAPICall(req.query.readAPIToken, options, function(apiResponse){
    callback(apiResponse);
  });
};

var getVideosByIds = function(req, videoIDs, callback)
{
  var options = {
    command: 'find_videos_by_ids'
    , video_ids: videoIDs.join(',')
    , video_fields: getVideoFields(req)
  };

  _makeAPICall(req.query.readAPIToken, options, function(apiResponse){
    callback(apiResponse);
  });
}
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- EXPORTS
exports.getVideoById = getVideoById;
exports.getVideosByIds = getVideosByIds;
//----------------------------------------------------------------------------------------- 