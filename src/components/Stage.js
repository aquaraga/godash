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
  getInitialState: function(){
    return {jobs: []};
  },

  componentDidMount: function() {
    if (this.props.drillDown) {
      Gocd.fetchJobs(this.props.data.details_path, (function(jobs){
        this.setState({jobs: jobs});
      }).bind(this),
      //TODO: error handling 
      function(){});  
    }
  },

  render: function() {
    let stageClass = classNames("stage", "fill-height-or-more", 
    	this.props.drillDown? undefined: allStatuses[this.props.data.status]);

    let renderJobs = () => this.state.jobs.map((job, index) => (<div key={index} className={classNames("job", allStatuses[job.result])}>{job.name}</div>));
    return (<div className={stageClass}>{this.props.drillDown? renderJobs() :this.props.data.name}</div>);
  }
});