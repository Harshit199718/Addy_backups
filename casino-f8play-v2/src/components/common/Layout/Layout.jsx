// src/Layout.js
import React, { useEffect } from "react";
import "./Layout.css"; // Importing our custom CSS

const Layout = ({ children }) => {
  function adjustAppContainer() {
    const appContainer = document.querySelector(".app_container_layout");
    if (window.innerWidth>window.innerHeight) {
      if ((window.innerWidth/window.innerHeight)>1.77) {
        appContainer.style.height = window.innerHeight + 'px';
        appContainer.style.width = window.innerHeight * 1.777 + 'px';
      } else {
        appContainer.style.width = window.innerWidth + 'px';
        appContainer.style.height = window.innerWidth * 0.5625 + 'px';
      }
    } else {
      if ((window.innerHeight/window.innerWidth)>1.77) {
        appContainer.style.height = window.innerWidth + 'px';
        appContainer.style.width = window.innerWidth * 1.777 + 'px';
      } else {
        appContainer.style.width = window.innerHeight + 'px';
        appContainer.style.height = window.innerHeight * 0.5625 + 'px';
      }
    }
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  useEffect(() => {
    // if (isIOS()) {
      if (document.readyState === 'complete') {
        adjustAppContainer();
      } else {
        window.addEventListener('load', adjustAppContainer);
      }
    // } else {
    //   window.addEventListener("load", adjustAppContainer);
    //   window.addEventListener("resize", adjustAppContainer);
    // }
  }, []);

  return (
    <div id="app_container" className="app_container_layout">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
