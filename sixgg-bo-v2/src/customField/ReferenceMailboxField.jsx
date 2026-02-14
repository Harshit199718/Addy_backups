import { Form, Select } from "antd";
import { useGetMailboxListQuery } from "../features/mailbox/mailboxApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceMailboxField = ({ name, label="Mailbox", apiErrors, disabled=false, mode="multiple" }) => {
    const { t } = useTranslation();
    const { 
        data: mailboxList,
        isLoading: mailboxLoading, 
    } = useGetMailboxListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 10000
        },
        filters: {}
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
                message: `${t('referencefield.Please select mailbox')}`,
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
                placeholder={t('referencefield.Please select mailbox')}
                options={mailboxList && mailboxList.list.map(mailbox => ({
                    value: mailbox.id,
                    label: `${mailbox.title}`
                }))}
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default ReferenceMailboxField