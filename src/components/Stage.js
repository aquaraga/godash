import React from 'react';
import classNames from 'classnames';

var allStatuses = {
  "Passed": "passed",
  "Cancelled": "cancelled",
  "Failed": "failed",
  "Unknown": "unknown",
  "Building": "building"
};

export default React.createClass({
  render() {
    let stageClass = classNames("stage", allStatuses[this.props.data.status]);
    return (<div className={stageClass}>{this.props.data.name}</div>);
  }
});