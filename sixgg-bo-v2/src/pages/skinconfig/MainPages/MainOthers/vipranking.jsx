import { Col, Form, Row, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"

export const VIPRanking = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.vip_ranking}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="vip_ranking"
                    label={t("skinconfig.VIP Ranking Image")}
                    apiErrors={apiErrors && apiErrors.vip_ranking}
                />
            </Col>
        </Row>
        </>
    )
}

