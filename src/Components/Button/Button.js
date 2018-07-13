// @flow
import React from "react";
import "./Button.css";

type Props = {
  text: string,
  icon: any,
  type: string,
  onClick?: Function
};

const Button = (props: Props) => (
  <button className={`PurpleButton _${props.type}`} onClick={props.onClick}>
    {props.icon && <span className="PurpleButton-icon">{props.icon}</span>}
    {props.text}
  </button>
);

export default Button;
