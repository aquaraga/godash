import React from 'react';
import { render } from 'react-dom';
import Dashboard from './components/Dashboard';
import _ from 'whatwg-fetch';

window.React = React;

fetch(config.url).then(function(response) {
    console.log('Received json');
    return response.json();
  }).then(function(dashboard) {
    return dashboard.map(pg => pg.pipelines).reduce((acc, p) => acc.concat(p));
  }).then(function(pipelines){
    return pipelines.filter(p => config.interests.indexOf(p.name) > -1);
  }).then(function(interestedPipelines) {
    render(
      <Dashboard pipelines={interestedPipelines}/>, document.getElementById('content')
    );    
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });