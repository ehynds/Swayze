/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/api/v1/:format/account/:publisherId([0-9]+)/token::token', routes.v1_account); //account
app.get('/api/v1/:format/account/:publisherId([0-9]+)/player/token::token', routes.v1_allPlayers); //all players
app.get('/api/v1/:format/account/:publisherId([0-9]+)/player/:playerId([0-9]+)/token::token', routes.v1_player); //player
app.get('/api/v1/:format/account/:publisherId([0-9]+)/video/token::token', routes.v1_allVideos); //all videos
app.get('/api/v1/:format/account/:publisherId([0-9]+)/video/:videoId([0-9]+)/token::token', routes.v1_video); //video
app.get('/api/v1/:format/account/:publisherId([0-9]+)/video/:videoId([0-9]+)/player/:playerId([0-9]+)/token::token', routes.v1_videoInPlayer); //video in a player

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
