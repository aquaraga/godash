import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Pipeline from '../../src/components/Pipeline';
import Stage from '../../src/components/Stage';

describe('Pipeline', () => {

	const data = {
    "name": "Pipeline-1",
    "instances": [{
      "stages": [{
        "name": "Stage-1",
      }, {
        "name": "Stage-2"
      }]
    }]
  };
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Pipeline data={data}/>);
  const pipeline = shallowRenderer.getRenderOutput();

  it('should have a div as container', () => {
    expect(pipeline.type).to.equal('div');
    expect(pipeline.props.className).to.equal('pipeline');
  });

  it('should show the pipeline name', () => {
    let details = pipeline.props.children;
    expect(details).to.not.be.undefined;
    expect(details[1]).to.deep.equal(<div className='pipeline-name'>Pipeline-1</div>);

  });

  it('should show the pipeline details', () => {
    let details = pipeline.props.children;
    expect(details[0]).to.deep.equal(
      <div className='stage-container'>
        <Stage key={'0'} data={data.instances[0].stages[0]}/>
        <Stage key={'1'} data={data.instances[0].stages[1]}/>
      </div>);
  });


});
