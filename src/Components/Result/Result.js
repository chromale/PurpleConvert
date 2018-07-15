// @flow
import React from "react";
import "./Result.css";
import type { ResultType } from "../Converter/Converter";

type Props = {
    result: ResultType
}
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
