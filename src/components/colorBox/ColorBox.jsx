import React, { useState } from "react";
import "./colorbox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ColorBox(props) {
  // destructure props
  const { background, name } = props;
  const [copied, setCopied] = useState(false);

  // event handler changes the copied state
  function changeCopyState() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
    console.log(copied);
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{ background: background }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background: background }}
        ></div>
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
