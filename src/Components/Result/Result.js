// @flow
import React from "react";
import "./Result.css";

type Props = {
  result: number,
  baseCurrency: string,
  destCurrency: string,
  amount: number
};
const Result = (props: Props) => (
  <div className="Result _shadow">
    <div className="Result-info">
      {props.amount} {props.baseCurrency.value} is approx.
    </div>
    <div className="Result-main">
      {props.result.toFixed(4)} {props.destCurrency.value}
    </div>
  </div>
);

export default Result;
