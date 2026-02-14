import React, { useRef, useEffect, useState } from "react";
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import '../suneditor.min.css'
import { Col, ColorPicker, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const CustomRichTextField = ({ name, apiErrors, label="Description", value="" }) => {
    const { t } = useTranslation();
    const editor = useRef();    
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={18}>
                <Form.Item
                    name={name}
                    label={label}
                    validateStatus={apiErrors ? 'error' : ''}
                    help={apiErrors}
                    hasFeedback
                >
                    <SunEditor
                        setContents={`${value}`}
                        getSunEditorInstance={getSunEditorInstance}
                        height="100%"
                        setOptions={{
                            buttonList: [
                                // default
                                ['undo', 'redo'],
                                ['font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
                                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                ['fontColor', 'hiliteColor', 'textStyle'],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                ['align', 'horizontalRule', 'list', 'lineHeight', 'table'],
                                ['-right', ':i-More Misc-default.more_vertical', 'showBlocks', 'codeView', 'preview', 'print', 'save'],
                                ['-right', 'image', 'video', 'audio', 'link'],
                            ],
                        }}
                        
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={6} style={{ border: "1px solid black"}}>
                <div  style={{ textAlign: 'center' }}>
                    <ColorPicker 
                        showText={(color) => <span>{t("common.Background (Preview only)")} ({color.toHexString()})</span>}
                        defaultValue={"#000000"}
                        onChange={(color) => {
                            const editableElements = document.querySelectorAll('.sun-editor-editable');
                            editableElements.forEach(element => {
                                element.style.backgroundColor = `#${color.toHex()}`;
                            });
                        }}
                    />
                    <Title level={5}  >{t("common.Mobile Preview")}</Title>
                </div>
                <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: value}} />
            </Col>
        </Row>
    )
}

export default CustomRichTextField;