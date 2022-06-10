import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./colorbox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ColorBox(props) {
  // destructure props
  const { background, name, key } = props;
  // set state
  const [copied, setCopied] = useState(false);

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
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{background}</span>
            <span className="color-name">{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <Link to="/" onClick={(e) => e.stopPropagation}>
          <span className="see-more">More</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
