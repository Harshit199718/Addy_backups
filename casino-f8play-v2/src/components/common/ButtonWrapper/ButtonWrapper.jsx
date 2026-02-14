import React from "react";
import "./ButtonWrapper.css"

function ButtonWrapper({ children, containerStyle, className, ...props }) {
  return (
    <div className={`btn_container ${className?className:""}`} style={containerStyle?containerStyle:{}}>
      <button className="uppercase" {...props}>{children}</button>
    </div>
  );
}

export default ButtonWrapper;
