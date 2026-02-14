import { Col, Form, Row, Switch } from "antd"

export const TopWinning = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Form.Item 
                    name="topwin"
                    label={t("skinconfig.Top Winning")}
                >
                    <Switch checkedChildren={t("skinconfig.Show Top Winning")} unCheckedChildren={t("skinconfig.Hide Top Winning")} />
                </Form.Item>
            </Col>
        </Row>
    )
}

