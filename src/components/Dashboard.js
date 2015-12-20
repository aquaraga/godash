import React from 'react';
import Pipeline from './Pipeline';

export default React.createClass({
  render() {
  	let renderedPipelines = this.props.pipelines.map((pipeline, index) => (<Pipeline key={index} data={pipeline} />));
    return (
      <div>
        {renderedPipelines}
      </div>
    );
  }
});