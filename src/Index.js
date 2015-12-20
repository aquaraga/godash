import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import _ from 'whatwg-fetch';

window.React = React;

var refreshDashboard = function(){
  fetch(config.gocd_dashboard).then(function(response){
    console.log('Response', response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      error.msg = "Error contacting Gocd, response code: " + response.status;
      throw error;
    }
  }).then(function(response) {
    return response.json();
  }).then(function(dashboard) {
    return dashboard.map(pg => pg.pipelines).reduce((acc, p) => acc.concat(p));
  }).then(function(pipelines){
    return pipelines.filter(p => config.interests.indexOf(p.name) > -1);
  }).then(function(interestedPipelines) {
    if (interestedPipelines.length == 0) {
      var error = new Error();
      error.msg = "No matching pipelines found, check config.js";
      throw error;
    }
    render(
      <Dashboard pipelines={interestedPipelines}/>, document.getElementById('content')
    );    
  }).catch(function(error) {
    console.log('Error: ', error);
    render(<Error msg={error.msg || "Generic error: Check javascript console for details"}/>, document.getElementById('content'));
  });
};

refreshDashboard();
setInterval(refreshDashboard, config.interval);

