// @flow
import React, { Component } from "react";
import "./Result.css";

type Props = {
  result: Object
};

class Result<Props> extends Component {
  state = {
    ...this.props.result
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.result);
    this.setState(() => ({ ...nextProps.result }));
  }

  render() {
    return (
      <div className="Result _shadow">
        <div className="Result-info">
          {this.state.amount} {this.state.from.value} is approx.
        </div>
        <div className="Result-main">
          {this.state.result.toFixed(2)} {this.state.to.value}
        </div>
      </div>
    );
  }
}

export default Result;
