import { Col, Row } from "antd"
import ImageField from "../../../../customField/ImageField"

export const Leaderboard = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <ImageField name="leaderboard_image" label={t("skinconfig.Leaderboard Image")} apiErrors={apiErrors && apiErrors.leaderboard_image} />
            </Col>
        </Row>
    )
}

