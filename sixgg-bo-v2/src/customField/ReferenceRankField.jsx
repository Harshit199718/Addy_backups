import { Form, Select } from "antd";
import { useGetRanksListQuery } from "../features/rank/ranksApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceRankField = ({ name, label="Ranks", apiErrors, disabled=false, mode="multiple" }) => {
    const { t } = useTranslation();
    const { 
        data: rankList,
        isLoading: rankLoading, 
    } = useGetRanksListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true
        }
    });

    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
            {
                required: true,
                message: `${t('referencefield.Please select rank!')}`,
            },
            ]}
            hasFeedback
        >
            <Select
                mode={mode}
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder={t('referencefield.Please select rank!')}
                options={rankList && rankList.list.map(rank => ({
                    value: rank.id,
                    label: `${t(`referencefield.${rank.name}`)}${rank.min_deposit ? ` (${t("referencefield.Min Deposit")} - ${rank.min_deposit})` : ''}`
                }))}
                
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default ReferenceRankField