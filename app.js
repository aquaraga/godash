var path = require('path');
var express = require('express');
var app = express();
var request = require('request');

var config = {
  gocd_dashboard: "http://go:C0mplexPwd@172.18.34.3:8153/go/dashboard.json",
  interests: [
    "PerformanceAnalytics-Build-Master",
    "PerformanceAnalytics-Smoke",
    "PerformanceAnalytics-QA",
    "StoryboardService-Build-Master",
    "StoryboardService-Smoke",
    "StoryboardService-QA",
    "StoryboardWeb-Build-Master",
    "StoryboardWeb-Smoke",
    "StoryboardWeb-QA",
    "DBMigration-Build",
    "LandingPageSeed-Build",
    "AuthProxy",
  ]
};


var fetchFromGocd = function(resFromServer){
  request({url: config.gocd_dashboard, json: true}, function (error, response, dashboard) {
    if (error || response.statusCode !== 200) {
      return {error: error};
    }
    var pipelines = dashboard.map(pg => pg.pipelines).reduce((acc, p) => acc.concat(p));
    var interestedPipelines = pipelines.filter(p => config.interests.indexOf(p.name) > -1);
    if (interestedPipelines.length == 0) {
      return {error: "No matching pipelines found, check config.js"};
    }
    return resFromServer.send({pipelines: interestedPipelines});
  });
};

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/dashboard.json', function(req, res){
  fetchFromGocd(res);
});


var server = app.listen(3100, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});