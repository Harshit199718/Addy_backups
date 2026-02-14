import { Col, Form, Row, Select, Divider, Tag, Input, Switch } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { skinConfigSideMenuBackgroundType, skinConfigSideMenuRouteChoices, skinConfigSideMenuTogglePosition } from "../../../customField/customOption"
import ColorPickerField from "../../../customField/ColorPickerField"

export const SideMenu = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Sidebar Configuration")}</Tag>
                    </Divider>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item 
                            name="enable_sidebar"
                            label={t("skinconfig.Side Bar")}
                        >
                            <Switch checkedChildren={t("skinconfig.Show Sidebar")} unCheckedChildren={t("skinconfig.Hide Sidebar")} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="sidebar_toggle_position"
                            label={t("skinconfig.Side Bar Position")}
                            validateStatus={apiErrors?.sidebar_toggle_position ? 'error' : ''}
                            help={apiErrors?.sidebar_toggle_position}
                            hasFeedback
                        >
                            <Select 
                                placeholder={t("skinconfig.Please select sidebar position")}
                                options={skinConfigSideMenuTogglePosition(t)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="sidebar_position"
                            label={t("skinconfig.Side Bar Show Position")}
                            validateStatus={apiErrors?.sidebar_position ? 'error' : ''}
                            help={apiErrors?.sidebar_position}
                            hasFeedback
                        >
                            <Select 
                                placeholder={t("skinconfig.Please select sidebar show position")}
                                options={skinConfigSideMenuTogglePosition(t)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="menusidebar_bg_type"
                            label={t("skinconfig.Sidebar Background Type")}
                            validateStatus={apiErrors?.menusidebar_bg_type ? 'error' : ''}
                            help={apiErrors?.menusidebar_bg_type}
                            hasFeedback
                        >
                            <Select 
                                placeholder={t("skinconfig.Please select sidebar background type")}
                                options={skinConfigSideMenuBackgroundType(t)}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8}>
                        <ColorPickerField 
                            name="menusidebar_bg_color"
                            label={t("skinconfig.Sidebar Container Color")}
                            apiErrors={apiErrors?.menusidebar_bg_color }
                        />
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <ColorPickerField  
                            name="sidebar_menu_item_bg"
                            label={t("skinconfig.Sidebar Item Color")}
                            apiErrors={apiErrors?.sidebar_menu_item_bg }
                        />
                    </Col>
                    {/* <Col xs={24} sm={24} md={2}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.menusidebar_bg}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={8}>
                        <ImageField 
                            name="menusidebar_bg"
                            label={t("skinconfig.Sidebar Background Image")} 
                            apiErrors={apiErrors && apiErrors.menusidebar_bg}
                        />
                    </Col>
                    {/* <Col xs={24} sm={24} md={2}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.login_icon}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={8}>
                        <ImageField 
                            name="login_icon"
                            label={t("skinconfig.Login Icon")} 
                            apiErrors={apiErrors && apiErrors.login_icon}
                        />
                    </Col>
                    {/* <Col xs={24} sm={24} md={2}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.logout_icon}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={8}>
                        <ImageField 
                            name="logout_icon"
                            label={t("skinconfig.Logout Icon")} 
                            apiErrors={apiErrors && apiErrors.logout_icon}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Sidebar Route")}</Tag>
                    </Divider>
                    {Array.from({ length: 12 }).map((v, i) => (
                        <Col xs={24} sm={24} md={12} key={i} 
                        style={{ 
                            border: "1px solid #ccc", 
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px", 
                        }} 
                        >
                            <Row gutter={[16, 16]}>
                                {/* <Col xs={24} sm={24} md={4}>
                                    <ImageListingField
                                        width={'80px'}
                                        height={'80px'}
                                        image={initialValues[`side_menu_icon_${i + 1}`]}
                                    />
                                </Col> */}
                                <Col xs={24} sm={24} md={12}>
                                    <ImageField 
                                        name={`side_menu_icon_${i + 1}`} 
                                        label={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Icon")}`} 
                                        buttonLabel={false}
                                        apiErrors={apiErrors && apiErrors[`side_menu_icon_${i + 1}`]}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item 
                                        name={`side_menu_active_${i + 1}`} 
                                        label={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Active")}`} 
                                    >
                                        <Switch checkedChildren={`${t("skinconfig.Show Sidebar")} ${i + 1}`}  unCheckedChildren={`${t("skinconfig.Hide Sidebar")} ${i + 1}`} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name={`side_menu_route_${i + 1}`}
                                        label={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Route")}`}
                                        validateStatus={apiErrors[`side_menu_route_${i + 1}`] ? 'error' : ''}
                                        help={apiErrors[`side_menu_route_${i + 1}`]}
                                        hasFeedback
                                    >
                                        <Select 
                                            placeholder={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Route")}`} 
                                            options={skinConfigSideMenuRouteChoices(t)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item
                                        name={`side_menu_text_${i + 1}`}
                                        label={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Route")}`}
                                        validateStatus={apiErrors[`side_menu_text_${i + 1}`] ? 'error' : ''}
                                        help={apiErrors[`side_menu_text_${i + 1}`]}
                                        hasFeedback
                                    >
                                        <Input placeholder={`${t("skinconfig.Sidebar")} ${i + 1} ${t("skinconfig.Text")}`} />
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

