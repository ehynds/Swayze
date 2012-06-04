
/*
 * GET home page.
 */
var brightcove = require('../controllers/brightcove.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.account = function(req, res){
  brightcove.getAccount(req.params.publisherId, function(pResponse){
    console.dir(pResponse);
    res.render('index', {title: 'Account'});
  });
};

exports.video = function(req, res){
  console.log('Format is: ' + req.params['format']);
  console.log('ID is: ' + req.params['id']);

  brightcove.getVideo(req.params.id, function(pResponse){
    res.render('index', { title: 'Video'});
  }); 
};