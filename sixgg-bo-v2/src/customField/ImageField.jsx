import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Upload } from "antd";
import { useDispatch } from "react-redux";
import { notification } from "../features/modalSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

const ImageField = ({ name, label, buttonLabel=true, apiErrors, require }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
    
          onSuccess({}, file);
          dispatch(notification({notification_status: 'success', notification_message: t('image.Upload Successfully')}));
        } catch (error) {
          onError(error);
          dispatch(notification({notification_status: 'error', notification_message: t('image.Upload Failed')}));
        }
    };

    return (
        <>
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
                {
                    required: require,
                    message: `${label} ${t("common.Is Required")}`,
                },
            ]}
            hasFeedback
            valuePropName="fileList"
            getValueProps={(e) => {
                try {
                    if (!Array.isArray(e)) {
                        return { 
                            fileList: [{
                                uid: '-1', 
                                name: `${e ? t("image.Preview Image") : t("image.No Image Uploaded")}`, 
                                status: 'done', 
                                url: e
                            }]
                        }
                    } else {
                        return { fileList: e }
                    }
                } catch (err) {
                  return {
                    fileList: [],
                  };
                }
            }}
            getValueFromEvent={e => {
                if (Array.isArray(e)) {
                    return e;
                }
                return e && e.fileList;
            }}
        >
            <Upload
                customRequest={handleCustomRequest}
                listType="picture"
                maxCount={1}
                showUploadList={{ showPreviewIcon: true }}
                onPreview={handlePreview}
            >
                <Button icon={<UploadOutlined />} style={{ display: 'flex', alignItems: 'center', height: "max-content" }}>
                    <span style={{ textWrap: "wrap" }}>
                        {t("common.Upload")} {buttonLabel && label}
                    </span>
                </Button>
            </Upload>
        </Form.Item>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
            <img
            alt="example"
            style={{
                width: '100%',
            }}
            src={previewImage}
            />
        </Modal>
        </>
    )
}

export default ImageField;