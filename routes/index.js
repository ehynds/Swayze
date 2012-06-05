//----------------------------------------------------------------------------------------- INIT
var brightcove = require('../controllers/brightcove.js');
//----------------------------------------------------------------------------------------- 


//----------------------------------------------------------------------------------------- PRIVATE
var _returnErrors = function(req, res){
  var errors = [];

  if(!req.params.token)
  {
    errors.push({'Error' : 'When making any API request, the token is required.'});  
  }

  if(!req.params.publisherId)
  {
    errors.push({'Error' : 'When making any API request, the publisher ID is required.'});  
  }
  
  res.contentType('json');
  res.send(pResponse);
};
//----------------------------------------------------------------------------------------- 



//----------------------------------------------------------------------------------------- VERSION 1: PUBLIC
var v1 = {
  account: function(req, res){
    if(req.params.token)
    {
      brightcove.getAccount(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    }
  },

  player: function(req, res){
    if(req.params.token && req.params.publisherId)
    {
      brightcove.getPlayer(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    }
  },

  forVideoInPlayer: function(req, res){
    if(req.params.token && req.params.videoId)
    {
      brightcove.getVideoInPlayer(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    }
  },

  allPlayers: function(req, res){
    if(req.params.token && req.params.publisherId)
    {
      brightcove.getAllPlayers(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    }
  },

  video: function(req, res){
    if(req.params.token)
    {
      brightcove.getVideo(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    } 
  },

  allVideos: function(req, res){
    if(req.params.token)
    {
      brightcove.getAllVideos(req, function(pResponse){
        res.contentType('json');
        res.send(pResponse);
      });
    }
    else
    {
      _returnErrors(req, res);
    } 
  }
};
//----------------------------------------------------------------------------------------- 



//----------------------------------------------------------------------------------------- EXPORTS
exports.v1_account = v1.account;
exports.v1_player = v1.player;
exports.v1_allPlayers = v1.allPlayers;
exports.v1_videoInPlayer = v1.forVideoInPlayer;
exports.v1_video = v1.video;
exports.v1_allVideos = v1.allVideos;
//----------------------------------------------------------------------------------------- 

