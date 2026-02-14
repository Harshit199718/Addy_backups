import { Col, Form, Row, Select, Divider, Tag, InputNumber, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ReferenceProductCategoryField from "../../../../customField/ReferenceProductCategoryField"

export const ProductCategory = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Category Size")}</Tag>
                    </Divider>
                    <Col xs={24} sm={24} md={4}>
                        <Form.Item 
                            name="category_text"
                            label={t("skinconfig.Category Label")}
                        >
                            <Switch checkedChildren={t("skinconfig.Show Category Label")} unCheckedChildren={t("skinconfig.Hide Category Label")} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <ReferenceProductCategoryField 
                            name="default_product_load"
                            label={t("skinconfig.Default Category")}
                            placeholder={t("skinconfig.Default Load Category")}
                            apiErrors={apiErrors && apiErrors.default_product_load}
                            filterProp={{
                                direct: true,
                                sites: initialValues["sites"],
                            }}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <Form.Item
                            name="category_tab_height"
                            label={t("skinconfig.Category Tab Height")}
                            validateStatus={apiErrors?.category_tab_height ? 'error' : ''}
                            help={apiErrors?.category_tab_height}
                            hasFeedback
                        >
                            <InputNumber placeholder={t("skinconfig.Category Tab Height")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <Form.Item
                            name="category_tab_width"
                            label={t("skinconfig.Category Tab Width")}
                            validateStatus={apiErrors?.category_tab_width ? 'error' : ''}
                            help={apiErrors?.category_tab_width}
                            hasFeedback
                        >
                            <InputNumber placeholder={t("skinconfig.Category Tab Width")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <Form.Item
                            name="category_image_height"
                            label={t("skinconfig.Category Image Height")}
                            validateStatus={apiErrors?.category_image_height ? 'error' : ''}
                            help={apiErrors?.category_image_height}
                            hasFeedback
                        >
                            <InputNumber placeholder={t("skinconfig.Category Image Height")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={4}>
                        <Form.Item
                            name="category_image_width"
                            label={t("skinconfig.Category Image Width")}
                            validateStatus={apiErrors?.category_image_width ? 'error' : ''}
                            help={apiErrors?.category_image_width}
                            hasFeedback
                        >
                            <InputNumber placeholder={t("skinconfig.Category Image Width")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Category Configuration")}</Tag>
                    </Divider>
                    {Array.from({ length: 10 }).map((v, i) => (
                        <Col xs={24} sm={24} md={8} key={i}>
                            <Row gutter={[16, 16]}>
                                {/* <Col xs={24} sm={24} md={6}>
                                    <ImageListingField
                                        width={'80px'}
                                        height={'80px'}
                                        image={initialValues[`category_tab_${i + 1}_icon`]}
                                    />
                                </Col> */}
                                <Col xs={24} sm={24} md={18}>
                                    <ImageField 
                                        name={`category_tab_${i + 1}_icon`} 
                                        label={`${t("skinconfig.Category Tab")} ${i + 1} ${t("skinconfig.Image")}`} 
                                        apiErrors={apiErrors && apiErrors[`category_tab_${i + 1}_icon`]}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <ReferenceProductCategoryField 
                                        name={`category_tab_${i + 1}_type`} 
                                        label={`${t("skinconfig.Category Tab")} ${i + 1} ${t("skinconfig.Product")}`} 
                                        placeholder={t("skinconfig.Please select category")}
                                        apiErrors={apiErrors && apiErrors[`category_tab_${i + 1}_type`]}
                                        filterProp={{
                                            direct: true,
                                            sites: initialValues["sites"],
                                        }}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item 
                                        name={`category_tab_${i + 1}_active`} 
                                        label={`${t("skinconfig.Category Tab")} ${i + 1} ${t("skinconfig.Active")}`} 
                                    >
                                        <Switch checkedChildren={`${t("skinconfig.Show Category Tab")} ${i + 1}`}  unCheckedChildren={`${t("skinconfig.Hide Category Tab")} ${i + 1}`} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    </>
    )
}

