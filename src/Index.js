import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';

window.React = React;

const data = [{
    "name": "Pipeline-1",
    "instances": [{
      "stages": [{
        "name": "Stage-1",
      }, {
        "name": "Stage-2"
      }]
    }]
  }];
console.log('Index called');
render(
  <Dashboard pipelines={data}/>, document.getElementById('content')
);
