var path = require('path');
var express = require('express');
var app = express();
var request = require('request');

var config = {
  gocd_url: "http://go:C0mplexPwd@172.18.34.3:8153",
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

//TODO Send the error in the response
var fetchFromGocd = function(resFromServer){
  request({url: config.gocd_url + "/go/dashboard.json", json: true}, function (error, response, dashboard) {
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

var fetchJobsFromGocd = function(resFromServer, pipeline, stage, pipelineCounter, stageCounter) {
  var stageDetailsUrl = [config.gocd_url, "go/api/stages", pipeline, stage, "instance", pipelineCounter, stageCounter ].join("/");
  console.log("Stage details url: " + stageDetailsUrl);
  request({url: stageDetailsUrl, json: true}, function (error, response, stageDetails) {
    if (error || response.statusCode !== 200) {
      return {error: error};
    }
    return resFromServer.send({jobs: stageDetails.jobs});
  });
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/dashboard.json', function(req, res){
  fetchFromGocd(res);
});

app.get('/stageDetails.json', function (req, res) {
  fetchJobsFromGocd(res, req.query.pipeline, req.query.stage, req.query.pipelineCounter, req.query.stageCounter);
});


var server = app.listen(3100, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});