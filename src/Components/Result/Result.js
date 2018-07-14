// @flow
import React from "react";
import "./Result.css";

type State = {
  to: Object,
  from: Object,
  amount: number,
  result: number
};

type Props = {
  result: State
};

class Result extends React.Component<Props, State> {
  state = {
    ...this.props.result
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState(() => ({ ...nextProps.result }));
  }

  render() {
    const { amount, from, to, result } = this.state;
    return (
      <div className="Result _shadow">
        <div className="Result-info">
          {amount} {from.value} is approx.
        </div>
        <div className="Result-main">
          {result.toFixed(2)} {to.value}
        </div>
      </div>
    );
  }
}

export default Result;
