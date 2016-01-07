import queryString from 'query-string';


var checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

var parseJSON = function(response) {
  return response.json()
};

export default {
	fetchJobs: function (stageDetailsPath, onSuccess, onFailure) {
		var stageDetailsArray = /\/go\/pipelines\/([\w-]+)\/([\w-]+)\/([\w-]+)\/([\w-]+)/.exec(stageDetailsPath);
		var pipeline = stageDetailsArray[1];
		var pipelineCounter = stageDetailsArray[2];
		var stage = stageDetailsArray[3];
		var stageCounter = stageDetailsArray[4];

    var params = {pipeline:pipeline, stage:stage, pipelineCounter:pipelineCounter, stageCounter:stageCounter};
		var url = "/stageDetails.json?" + queryString.stringify(params);

    require("whatwg-fetch");
		fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(stageDetails) {
    	onSuccess(stageDetails.jobs);
    })
    .catch(function(error) {
      console.log('Error: ', error);
      onFailure(error);
    });

	}
};