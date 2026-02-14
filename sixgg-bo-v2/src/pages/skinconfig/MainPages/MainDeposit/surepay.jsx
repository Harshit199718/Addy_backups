import { Col, Divider, Row, Tag } from "antd"
import ImageField from "../../../../customField/ImageField"

export const DepositSurepay= ({ apiErrors, initialValues, watchValue, t }) => {
    
    return (
        <>
        <Divider>
            <Tag color="blue">{t("skinconfig.Payment Gateway")}</Tag>
        </Divider>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_surepay"
                            label={t("skinconfig.Surepay")} 
                            apiErrors={apiErrors && apiErrors.deposit_surepay}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Divider>
            <Tag color="blue">{t("skinconfig.Ewallet")}</Tag>
        </Divider>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_ewallet"
                            label={t("skinconfig.Surepay Ewallet")} 
                            apiErrors={apiErrors && apiErrors.deposit_ewallet}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_doitnow"
                            label={t("skinconfig.Surepay Duit Now")} 
                            apiErrors={apiErrors && apiErrors.deposit_doitnow}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_tng"
                            label={t("skinconfig.Surepay TNG")} 
                            apiErrors={apiErrors && apiErrors.deposit_tng}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}

