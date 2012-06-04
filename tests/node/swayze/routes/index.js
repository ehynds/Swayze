
/*
 * GET home page.
 */
var brightcove = require('../controllers/brightcove.js');

var returnErrors = function(req, res){
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

exports.account = function(req, res){
  if(req.params.token)
  {
    brightcove.getAccount(req, function(pResponse){
      res.contentType('json');
      res.send(pResponse);
    });
  }
  else
  {
    returnErrors(req, res);
  }
};

exports.player = function(req, res){
  if(req.params.token && req.params.publisherId)
  {
    brightcove.getPlayer(req, function(pResponse){
      res.contentType('json');
      res.send(pResponse);
    });
  }
  else
  {
    returnErrors(req, res);
  }
};

exports.video = function(req, res){
  if(req.params.token)
  {
    brightcove.getVideo(req, function(pResponse){
      res.contentType('json');
      res.send(pResponse);
    });
  }
  else
  {
    returnErrors(req, res);
  } 
};