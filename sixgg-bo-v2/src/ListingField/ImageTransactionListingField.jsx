import React from 'react';
import { Image, Row, Tag } from 'antd';
import { Icon } from '@iconify/react';
import ImageListingField from './ImageListingField';
import { useTranslation } from 'react-i18next';

const ImageTransactionListingField = ({ image, showLabel=true }) => {
    const { t } = useTranslation();

    return (
        <>
            {showLabel && 
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="mingcute:attachment-fill" style={{marginRight: "5px"}} />} color="purple">
                    {`${t("common.Attachment")}:`}
                </Tag>
            </Row>
            }
            <Row style={{ marginBottom: showLabel ? 5 : 0 }}>
                <ImageListingField image={image} width={80} height={80} />
            </Row>
        </>
    );
}

export default ImageTransactionListingField;
