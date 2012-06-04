
/*
 * GET home page.
 */
var brightcove = require('../controllers/brightcove.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.account = function(req, res){
  brightcove.getAccount(req.params.token, req.params.publisherId, function(pResponse){
    res.contentType('json');
    res.send(pResponse);
  });
};

exports.player = function(req, res){
brightcove.getPlayer(req.params.token, req.params.playerId, function(pResponse){
    res.contentType('json');
    res.send(pResponse);
  });
};

exports.video = function(req, res){
  brightcove.getVideo(req.params.token, req.params.videoId, function(pResponse){
    res.contentType('json');
    res.send(pResponse);
  }); 
};