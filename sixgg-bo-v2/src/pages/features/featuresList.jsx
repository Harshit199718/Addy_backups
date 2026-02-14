import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import ProductSwitch from './feature/ProductSwitch';
import GeneratePlayerSingleLevelRebate from './feature/GeneratePlayerSingleLevelRebate';
import CheckPromotionEligible from './feature/CheckPromotionEligible';
import PermissionsAuth from '../../components/permissionAuth';
import BatchDiscardGameAccount from './feature/BatchDiscardGameAccount';
import ExportExcel from './feature/ExportExcel';
import { useTranslation } from 'react-i18next';
import CheckMissionEligible from './feature/CheckMissionEligible';

const { Title } = Typography;

const FeaturesList = ({}) => {
    const { t } = useTranslation();
    return (
        <>
            <Divider>
                <Title level={2} >{t("feature.Feature")}</Title>
            </Divider>
            <Row gutter={[24, 24]}>
                {PermissionsAuth.checkAdminPermissions('menu',
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <ProductSwitch t={t} />
                </Col>
                )}
                {PermissionsAuth.checkAdminPermissions('menu',
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <GeneratePlayerSingleLevelRebate t={t} />
                </Col>
                )}
                {PermissionsAuth.checkPermissions('menu', 'view_promotion', 
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <CheckPromotionEligible t={t} />
                </Col>
                )}
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <CheckMissionEligible t={t} />
                </Col>
                {PermissionsAuth.checkAdminPermissions('menu', 
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <BatchDiscardGameAccount t={t} />
                </Col>
                )}
                {PermissionsAuth.checkPermissions('menu', 'export_report_excel',
                <Col xs={8} sm={6} md={6} lg={4} xl={3} xxl={3} align="left">
                    <ExportExcel t={t} />
                </Col>
                )}
            </Row>
        </>
    )
};

export default FeaturesList;