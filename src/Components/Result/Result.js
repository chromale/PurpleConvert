// @flow
import React from "react";
import "./Result.css";

type Props = {
  result: number,
  baseCurrency: string,
  destCurrency: string,
  amount: number
};
const Result = (props: Props) => <div className="Result">{props.result}</div>;

export default Result;
