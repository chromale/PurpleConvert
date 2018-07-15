// @flow
import React from "react";
import "./Result.css";

type Props = {
  result: {
    to: Object,
    from: Object,
    amount: number,
    result: number
  }
};

const Result = (props: Props) => (
  <div className="Result _shadow">
    <div className="Result-info">
      {props.result.amount} {props.result.from.value} is approx.
    </div>
    <div className="Result-main">
      {props.result.result.toFixed(2)} {props.result.to.value}
    </div>
  </div>
);

export default Result;
