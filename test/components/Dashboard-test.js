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

  const stage_detail_interests = [
    {
      pipeline: "Pipeline-2",
      stages: ["Stage-1"]
    }
  ]
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Dashboard pipelines={pipelines} stage_detail_interests={stage_detail_interests}/>);
  const dashboard = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(dashboard.type).to.equal('div');
  });

  it('should show a list of pipeline statuses', () => {
  	let list = dashboard.props.children;
  	expect(list.length).to.equal(3);
  	list.forEach((pipeline, index) => {
  		expect(pipeline.type).to.equal(Pipeline);
      expect(pipeline.key).to.equal(index.toString());
  		expect(pipeline.props.data).to.equal(pipelines[index]);
  	});
  });

  it('should pass the list of stages to pipelines that require to be rendered in detail', () => {
    let list = dashboard.props.children;
    expect(list[0].props.drill_down_stages).to.deep.equal([]);
    expect(list[1].props.drill_down_stages).to.deep.equal(["Stage-1"]);
  });
});
