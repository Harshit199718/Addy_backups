import { Col, Form, Row, Select, Divider, Tag, Input, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"

export const ProductSetting = ({ apiErrors, initialValues, watchValue, t }) => {

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
                <Form.Item 
                    name="vertical_tab"
                    label={t("skinconfig.Category Tab Horizontal / Vertical")}
                >
                    <Switch checkedChildren={t("skinconfig.Category Tab Vertical")} unCheckedChildren={t("skinconfig.Category Tab Horizontal")} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Form.Item 
                    name="change_game_id"
                    label={t("skinconfig.App Game Change Game ID")}
                >
                    <Switch checkedChildren={t("skinconfig.Allow Change App Game ID")} unCheckedChildren={t("skinconfig.Block Change App Game ID")} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Form.Item 
                    name="game_launch_in_site"
                    label={t("skinconfig.Iframe Launch Game")}
                >
                    <Switch checkedChildren={t("skinconfig.Iframe Launch Game")} unCheckedChildren={t("skinconfig.New Windows Launch Game")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
                <ImageField
                    name="loading_image"
                    label={t("skinconfig.Game Loading Image (GIF)")}
                    apiErrors={apiErrors && apiErrors.loading_image}
                />
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="feature_game_title"
                    label={t("skinconfig.Feature Game Title")}
                    validateStatus={apiErrors?.feature_game_title ? 'error' : ''}
                    help={apiErrors?.feature_game_title}
                    hasFeedback
                >
                        <Input placeholder={t("skinconfig.Feature Game Title")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
        </Row>
    </>
    )
}

