import React from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import "../../pages/Promo/suneditor.min.css";

function FooterContent() {
  const { footer_content } = useSelector(selectConfigData);
  return <div className="sun-editor-editable" dangerouslySetInnerHTML={{ __html: footer_content }} />;
}

export default FooterContent;
