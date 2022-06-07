import React from "react";
import "./colorbox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ColorBox(props) {
  // destructure props
  const { background, name } = props;

  return (
    <CopyToClipboard text={background}>
      <div className="ColorBox" style={{ background: background }}>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">More</span>
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
