import React from 'react';
import classNames from 'classnames';
import Gocd from '../lib/Gocd';

var allStatuses = {
  "Passed": "passed",
  "Cancelled": "cancelled",
  "Failed": "failed",
  "Unknown": "unknown",
  "Building": "building"
};

export default React.createClass({
  render() {
    let stageClass = classNames("stage", "fill-height-or-more", 
    	this.props.drillDown? undefined: allStatuses[this.props.data.status]);

    let renderJobs = () => Gocd.fetchJobs().map((job, index) => (<div key={index} className={classNames("job", allStatuses[job.status])}></div>));

    return (<div className={stageClass}>{this.props.drillDown? renderJobs() :this.props.data.name}</div>);
  }
});