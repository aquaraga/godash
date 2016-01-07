import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import _ from 'whatwg-fetch';
import config from '../config/config';

window.React = React;

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
  return response.json();
};

var showPipelines = function(json) {
  render(
      <Dashboard pipelines={json.pipelines} stage_detail_interests={config.stage_detail_interests}/>, document.getElementById('content')
  );
};

var refreshDashboard = function(){
  fetch('/dashboard.json')
    .then(checkStatus)
    .then(parseJSON)
    .then(showPipelines)
    .catch(function(error) {
      console.log('Error: ', error);
      render(<Error msg={error.msg || "Generic error: Check javascript console for details"}/>, document.getElementById('content'));
  });
};

refreshDashboard();
setInterval(refreshDashboard, config.interval);

