import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Dashboard from '../../src/components/Dashboard';
import Pipeline from '../../src/components/Pipeline';

describe('Dashboard', () => {

	const pipelines = [{
		"name": "Pipeline-1"
	}, {
		"name": "Pipeline-2"
	}, {
		"name": "Pipeline-3"
	}];
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Dashboard pipelines={pipelines}/>);
  const dashboard = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(dashboard.type).to.equal('div');
  });

  it('should show a list of pipeline statuses', () => {
  	let list = dashboard.props.children;
  	expect(list.length).to.equal(3);
  	list.forEach((pipeline, index) => {
  		expect(pipeline.type).to.equal(Pipeline);
  		expect(pipeline.props.data).to.equal(pipelines[index]);
  	});
  });
});
