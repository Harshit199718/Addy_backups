import { Col, Form, Row, Select, Divider, Tag, Input, Switch } from "antd"
import { skinConfigCountryChoices, skinConfigLanguageChoices, skinConfigLanguagePositionChoices } from "../../../customField/customOption"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"

export const Region = ({ apiErrors, initialValues, watchValue, t }) => {

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="country"
                    label={t("skinconfig.Country")}
                    validateStatus={apiErrors?.country ? 'error' : ''}
                    help={apiErrors?.country}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select country of the site")}
                        options={skinConfigCountryChoices(t)}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.language_icon}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField
                    name="language_icon"
                    label={t("skinconfig.Language Icon")}
                    apiErrors={apiErrors && apiErrors.language_icon}
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="available_languages"
                    label={t("skinconfig.Available Languages")}
                    validateStatus={apiErrors?.available_languages ? 'error' : ''}
                    help={apiErrors?.available_languages}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select language of the site")}
                        options={skinConfigLanguageChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="default_lang"
                    label={t("skinconfig.Default Languages")}
                    validateStatus={apiErrors?.default_lang ? 'error' : ''}
                    help={apiErrors?.default_lang}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select default language of the site")}
                        options={skinConfigLanguageChoices(t)}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="language_toggle_position"
                    label={t("skinconfig.Switch Language Position")}
                    validateStatus={apiErrors?.language_toggle_position ? 'error' : ''}
                    help={apiErrors?.language_toggle_position}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select language position")}
                        options={skinConfigLanguagePositionChoices(t)}
                    />
                </Form.Item>
            </Col>
        </Row>
    </>
    )
}

