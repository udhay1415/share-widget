import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "../index.css";
import "./style.scss";

const ComponentPropTypes = {
  title: PropTypes.string.isRequired,
  setShareActive: PropTypes.func.isRequired,
  isShareActive: PropTypes.bool.isRequired,
  buttonBg: PropTypes.string.isRequired,
  buttonTextColor: PropTypes.string.isRequired,
};

type ComponentTypes = InferProps<typeof ComponentPropTypes>;
const Button = ({ title, setShareActive, isShareActive, buttonBg, buttonTextColor }: ComponentTypes) => {
  return (
    <button
      onClick={() => setShareActive(!isShareActive)}
      onKeyDown={(e) => console.log(e)}
      className="button"
      style={{
        backgroundColor: buttonBg,
        color: buttonTextColor,
      }}
    >
      {title}
    </button>
  )
}

export default Button;