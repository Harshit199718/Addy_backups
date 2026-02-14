import { Form, Select, Input } from "antd";
import { useGetMessageTemplateListQuery } from "../features/messagetemplate/messagetemplateApiSlices";
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const ReferenceMessageTemplateField = ({ apiErrors, disabled = false, titleName, messageName, form }) => {
  const { t } = useTranslation();
    const [message] = [
        'message',
      ].map(field => Form.useWatch(field, form));

    const { data: messageTemplateList, isLoading: messageTemplateLoading } = useGetMessageTemplateListQuery({
      pagination: { startPageRow: 0, endPageRow: 100 },
      filters: { active: true },
    });
  
  
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');
  
    useEffect(() => {
      const messagetemplate = messageTemplateList?.list.find(item => item.id === selectedTitle);
      setSelectedMessage(messagetemplate?.message || '');
      form.setFieldsValue({
        message: messagetemplate?.message
      });
    }, [selectedTitle, messageTemplateList]);
  
    const handleMessageChange = (value) => {
      setSelectedTitle(value);
      const messagetemplate = messageTemplateList?.list.find(item => item.id === value);
      setSelectedMessage(messagetemplate?.message || '');
    };
  
    return (
      <>
        <Form.Item
            name={titleName}  // Use the prop titleName for the title Form.Item
            label={t("common.Title")}
            validateStatus={apiErrors && apiErrors.title ? 'error' : ''}
            help={apiErrors && apiErrors.title}
            hasFeedback
            >
            <Select
              mode="single"
              allowClear
              style={{ width: '100%', marginBottom: '10px' }}
              placeholder={t("referencefield.Please select title")}
              options={messageTemplateList?.list.map(messagetemplate => ({
              value: messagetemplate.id,
              label: `${messagetemplate.title}`
              }))}
              disabled={disabled}
              onChange={handleMessageChange}
              value={selectedTitle}
          />
        </Form.Item>
        <Form.Item
            name={messageName}  // Use the prop messageName for the message Form.Item
            label={t("common.Message")}
            validateStatus={apiErrors && apiErrors.message ? 'error' : ''}
            help={apiErrors && apiErrors.message}
            hasFeedback
        >
          <Input.TextArea
            style={{ width: '100%' }}
            autoSize={{ minRows: 6, maxRows: 12 }}
            showCount maxLength={250}
            placeholder={t("referencefield.Please input message!")}
            disabled={disabled}
            onChange={(e) => setSelectedMessage(e.target.value)}
            // value={selectedMessage}
          />
        </Form.Item>
      </>
    );
  };
  
  export default ReferenceMessageTemplateField;
