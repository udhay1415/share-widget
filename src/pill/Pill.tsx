import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./style.scss";

const ComponentPropTypes = {
  title: PropTypes.string.isRequired,
  selectedEntity: PropTypes.array.isRequired,
  setSelectedEntity: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

type ComponentTypes = InferProps<typeof ComponentPropTypes>;
const Pill = ({ title, bgColor, textColor, selectedEntity, setSelectedEntity }: ComponentTypes) => {

  const onClickHandler = () => {
    let selectedEntityClone = [...selectedEntity]
    selectedEntityClone.forEach((entity, index) => {
      if (entity.name == title) {
        selectedEntityClone.splice(index, 1)
      }
    })
    setSelectedEntity(selectedEntityClone)
  }

  return (
    <div style={{ background: bgColor, color: textColor }} className="pill">
      <div className="pill-text">
        <p>{title}</p>
      </div>
      <button className="pill-close" onClick={() => onClickHandler()}>
        <img className="pill-close-icon" src={require('../../assets/close-icon.svg')} />
      </button>
    </div>
  )
}

Pill.defaultProps = {
  bgColor: "#E5E7EB",
  textColor: "#111827"
}

export default Pill;