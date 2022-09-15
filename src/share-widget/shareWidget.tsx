import React, {useEffect, useState} from "react";
import PropTypes, { InferProps } from "prop-types";
import Popup from "../popup";
import Button from "../button";
import "../index.css";

const ComponentPropTypes = {
  title: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  headerDescription: PropTypes.string.isRequired,
  bodyTitle: PropTypes.string.isRequired,
  bodyDescription: PropTypes.string.isRequired,
  isShareActive: PropTypes.bool.isRequired,
  setSearchActive: PropTypes.bool.isRequired,
  buttonBg: PropTypes.string.isRequired,
  buttonTextColor: PropTypes.string.isRequired,
};

type ComponentTypes = InferProps<typeof ComponentPropTypes>;
const ShareWidget = ({ title, headerTitle, headerDescription, bodyTitle, bodyDescription, buttonBg, buttonTextColor }: ComponentTypes) => {
  const [isShareActive, setShareActive] = useState(false)
  const [isSearchActive, setSearchActive] = useState(false)
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log('isSearchActive', isSearchActive)
      if(e.key == "Escape") {
        setSearchActive(false)
        setShareActive(false)
      }
    })
  }, [])
  return (
    <div>
      <Button title={title} setShareActive={setShareActive} isShareActive={isShareActive} buttonBg={buttonBg} buttonTextColor={buttonTextColor} />
      <Popup 
        isShareActive={isShareActive}
        headerTitle={headerTitle}
        headerDescription={headerDescription}
        bodyTitle={bodyTitle}
        bodyDescription={bodyDescription}
        isSearchActive={isSearchActive}
        setSearchActive={setSearchActive}
      />
    </div>
  )
}

export default ShareWidget;