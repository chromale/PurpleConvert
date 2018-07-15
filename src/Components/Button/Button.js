// @flow
import * as React from "react";
import "./Button.css";

type Props = {
  text: string,
  icon: React.Element<any>,
  type: string,
  onClick: Function,
  disabled?: boolean
};

const Button = (props: Props) => (
  <button
    className={`PurpleButton _${props.type}`}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.icon && <span className="PurpleButton-icon">{props.icon}</span>}
    {props.text}
  </button>
);

export default Button;
