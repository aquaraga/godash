import React from 'react';
import Stage from './Stage';

export default React.createClass({
  render() {
  	let details = this.props.data;
  	let stages = details.instances[0].stages.map((stage, index) => (<Stage key={index} data={stage}/>));
    return (
      <div className='pipeline'>
        <div className='stage-container'>{stages}</div>
        <div className='pipeline-name'>{details.name}</div>
      </div>
    );
  }
});