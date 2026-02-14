import { Col, Row, Switch, Button, Select, ColorPicker } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import ResetPassword from './ResetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, setLanguageSelected, setSupportPersonalization } from '../../features/generalSlice';
import TwoFAConfiguration from './2FAConfiguration';
import { languageOptions } from '../../customField/customOption';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../features/auth/authSlice';

const UserMenuOption = ({list}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { isDarkMode, languageSelected, supportPersonalization } = useSelector(state => state.general);

    return (
        <Col>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Switch 
                    value={isDarkMode}
                    checkedChildren={t("general.Dark Mode")}
                    unCheckedChildren={t("general.Light Mode")}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={(value) => dispatch(setDarkMode(value))}
                />
            </Row>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <ColorPicker 
                defaultValue={
                    supportPersonalization?.headerColor ? 
                        supportPersonalization?.headerColor 
                    : 
                        "#001528" 
                }
                showText={(color) => <span>{t("skinconfig.Header Background Color")} ({color.toHexString()})</span>}
                onChange={(color) => {
                    dispatch(setSupportPersonalization({
                        username: list?.length > 0 && list[0].username,
                        headerColor: `#${color.toHex()}`
                    }))
                }}
                />
            </Row>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Select
                    style={{ width: '100%' }}
                    options={languageOptions}
                    value={languageSelected}
                    onChange={(value) => dispatch(setLanguageSelected(value))}
                />
            </Row>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Button 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    icon={<Icon icon="f7:qrcode-viewfinder" width="1.2rem" height="1.2rem" style={{ marginRight: '5px' }} />}
                    onClick={() => {}}
                >
                    <span style={{ flex: '1' }}><TwoFAConfiguration userID={list?.length > 0 && list[0].user} t={t} /></span>
                </Button>
            </Row>}
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <Button 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    icon={<Icon icon="ic:sharp-password" width="1.2rem" height="1.2rem" style={{ marginRight: '5px' }} />}
                    onClick={() => {}}
                >
                    <span style={{ flex: '1' }}><ResetPassword role='support' userID={list?.length > 0 && list[0].user} /></span>
                </Button>
            </Row>
            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    icon={<Icon icon="material-symbols:logout-sharp" width="1.2rem" height="1.2rem" style={{ marginRight: '5px' }} />}
                    onClick={() => dispatch(logOut({ status: 'success', message: 'Logout Successfully'}))}
                >
                    <span style={{ flex: '1' }}>{t("general.Logout")}</span>
                </Button>
            </Row>
        </Col>
    )
}

export default UserMenuOption