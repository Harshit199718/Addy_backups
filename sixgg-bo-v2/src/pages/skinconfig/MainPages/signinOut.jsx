import { Col, Form, Row, Select, Switch } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { skinConfigChangePasswordStyle, skinConfigSignInStyle, skinConfigSignUpStyle } from "../../../customField/customOption"

export const SignInOut = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK && 
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="login_style"
                    label={t("skinconfig.Sign In Style")}
                    validateStatus={apiErrors?.login_style ? 'error' : ''}
                    help={apiErrors?.login_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select sign in style")}
                        options={skinConfigSignInStyle(t)}
                    />
                </Form.Item>
            </Col>}
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK && 
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="signup_version"
                    label={t("skinconfig.Sign Up Style")}
                    validateStatus={apiErrors?.signup_version ? 'error' : ''}
                    help={apiErrors?.signup_version}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select sign up style")}
                        options={skinConfigSignUpStyle(t)}
                    />
                </Form.Item>
            </Col>}
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK && 
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="change_password_style"
                    label={t("skinconfig.Change Password Style")}
                    validateStatus={apiErrors?.change_password_style ? 'error' : ''}
                    help={apiErrors?.change_password_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select change password style")}
                        options={skinConfigChangePasswordStyle(t)}
                    />
                </Form.Item>
            </Col>}
        </Row>
        <Row gutter={[16, 16]}>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.login_image}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="login_image"
                    label={t("skinconfig.Sign In / Out Banner")}
                    apiErrors={apiErrors && apiErrors.login_image}
                />
            </Col>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.forget_password_image}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="forget_password_image"
                    label={t("skinconfig.Forget Password Banner")}
                    apiErrors={apiErrors && apiErrors.forget_password_image}
                />
            </Col>
        </Row>
        </>
    )
}

