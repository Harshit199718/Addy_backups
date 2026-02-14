import { Form, Select } from "antd";
import { useGetPlayerIDQuery } from "../features/player/playerApiSlices";
import { useTranslation } from "react-i18next";

const ReferencePlayerIDField = ({ name, apiErrors, label, playerID }) => {
    const { t } = useTranslation();
    const { 
        data: playerList,
        isLoading: playerLoading,
      } = useGetPlayerIDQuery({ id: playerID });

    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
            {
                required: true,
                message: `${t('referencefield.Please select player!')}`,
            },
            ]}
            hasFeedback
        >
            <Select 
                loading={playerLoading}
                disabled
                allowClear
                style={{ width: '100%' }}
                placeholder={t('referencefield.Please select player!')}
                options={playerList && [playerList].map(item => ({
                    value: item.id,
                    label: `${item.username} (${item.balance})`
                }))}
            />
        </Form.Item>
    )
}

export default ReferencePlayerIDField