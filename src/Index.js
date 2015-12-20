import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';

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
render(
  <Dashboard pipelines={data}/>, document.getElementById('content')
);
