import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./colorbox.css";

function ColorBox(props) {
  // destructure props
  const { background, name, key, moreUrl, showLink } = props;
  // set state
  const [copied, setCopied] = useState(false);
  // use this variable - stores a boolean value to determin which color the text on the color boxes should be
  const isDarkColor = chroma(background).luminance() <= 0.06;
  const isLightColor = chroma(background).luminance() >= 0.6;

  // event handler changes the copied state
  function changeCopyState() {
    // change state to true - if true add className show to the overlay div
    setCopied(true);
    // Wait 1.5s before changing the copied state back to false
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{ background: background }} key={key}>
        {/* Copied Overlay */}
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background: background }}
        ></div>
        <div className={`copy-message ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p className={isLightColor && "dark-text"}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor && "light-text"}>{background}</span>
            <span className={isDarkColor && "light-text"}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && "dark-text"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation}>
            <span className={`see-more ${isLightColor && "dark-text"}`}>
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
