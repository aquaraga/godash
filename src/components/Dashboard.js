import React from 'react';
import Pipeline from './Pipeline';

export default React.createClass({
  render() {
  	let renderedPipelines = this.props.pipelines.map((pipeline, index) => 
  		(<Pipeline key={index} data={pipeline} drill_down_stages={this.drillDownStagesFor(pipeline)} />));
    return (
      <div>
        {renderedPipelines}
      </div>
    );
  },
  drillDownStagesFor(pipeline) {
  	for (var i = this.props.stage_detail_interests.length - 1; i >= 0; i--) {
  		if (this.props.stage_detail_interests[i].pipeline === pipeline.name)
  			return this.props.stage_detail_interests[i].stages;
  	}
  	return [];
  }
});