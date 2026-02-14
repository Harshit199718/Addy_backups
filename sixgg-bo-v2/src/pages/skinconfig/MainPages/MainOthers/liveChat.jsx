import { Col, Form, Row, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"

export const LiveChat = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.livechat_image}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="livechat_image"
                    label={t("skinconfig.Live Chat Background Image")}
                    apiErrors={apiErrors && apiErrors.livechat_image}
                />
            </Col>
        </Row>
        </>
    )
}

