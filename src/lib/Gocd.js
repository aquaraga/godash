import _ from 'whatwg-fetch';


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
	fetchJobs: function (stageDetailsPath, onSuccess) {
		var stageDetailsArray = /\/go\/pipelines\/([\w-]+)\/([\w-]+)\/([\w-]+)\/([\w-]+)/.exec(stageDetailsPath);
		var pipeline = stageDetailsArray[1];
		var pipelineCounter = stageDetailsArray[2];
		var stage = stageDetailsArray[3];
		var stageCounter = stageDetailsArray[4];

		var url = new URL("http://localhost:3100/stageDetails.json"),
       params = {pipeline:pipeline, stage:stage, pipelineCounter:pipelineCounter, stageCounter:stageCounter};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		/*fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(stageDetails) {
    	onSuccess(stageDetails.jobs);
    })
    .catch(function(error) {
      console.log('Error: ', error);
      //render(<Error msg={error.msg || "Generic error: Check javascript console for details"}/>, document.getElementById('content'));
    });*/

	}
};