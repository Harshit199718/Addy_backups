import { Form, Select, Spin, Transfer } from "antd";
import { useGetPlayerSimpleListQuery } from "../features/player/playerApiSlices";
import { useTranslation } from "react-i18next";

const ReferencePlayerTransferField = ({ name, apiErrors, label="Player", disabled=false, mode=null, isRequired=true, filterProp={}, targetKeys=[] }) => {
    const { t } = useTranslation();
    const { 
        data: playerList,
        isFetching 
    } = useGetPlayerSimpleListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
            active: true,
            ...filterProp
        }
    });

    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            {isFetching ? 
            <Spin />
            :
            <Transfer
                status={apiErrors ? 'error' : ''}
                dataSource={playerList?.list}
                rowKey={(record) => record.id}
                showSearch
                filterOption={(inputValue, option) =>
                    option.username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.sites_name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                }
                listStyle={{
                    minWidth: 230,
                    height: 300,
                    width:  500,
                }}
                titles={[t('referencefield.Not Applied'), t('referencefield.Applied')]}
                targetKeys={targetKeys?.filter(key => key !== null)}
                render={(item) => `${item.username} (${item.wallet_balance}) [${item.sites_name}]`}
            />
            }
        </Form.Item>
    )
}

export default ReferencePlayerTransferField