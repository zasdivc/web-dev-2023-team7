/*
 * timestamp: 2023年04月18日 00:19:56
 * description: adverse component
 */
import "./index.css";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";

const Adverise = (props) => {
  return (
    <div className="overlay">
      <div className="content">
        <div className="cont-main">
          <img
            className="icon-close"
            src={require("./close-circle-fill.png")}
            onClick={() => props.close()}
          />

          <div className="cont-img">
            <img className="advers-img" src={require("./adverse.png")} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default forwardRef(Adverise);
