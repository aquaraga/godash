import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';
import _ from 'whatwg-fetch';

window.React = React;

const data = [{
    "name": "Pipeline-1",
    "instances": [{
      "stages": [{
        "name": "Stage-1",
        "status": "Passed"
      }, {
        "name": "Stage-2",
        "status": "Building"
      }]
    }]
  }];


fetch(config.url).then(function(response) {
    console.log('Received json');
    return response.json();
  }).then(function(json) {
    console.log('parsed json', json);
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });

render(
  <Dashboard pipelines={data}/>, document.getElementById('content')
);
