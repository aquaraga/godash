import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="error">
        {this.props.msg}
      </div>
    );
  }
});