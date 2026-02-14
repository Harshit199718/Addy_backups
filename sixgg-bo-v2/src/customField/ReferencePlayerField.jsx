import { Form } from "antd";
import { useGetPlayerSimpleListQuery } from "../features/player/playerApiSlices";
import SelectOption from "../customToolbar/SelectOption";
import { useState } from "react";
import { useDebounce } from "../customToolbar/SearchBar";
import { useTranslation } from "react-i18next";

const ReferencePlayerField = ({ name, apiErrors, label="Player", disabled=false, onChange = () => {}, filterProp={}, ...props}) => {
    const { t } = useTranslation();
    const [playerSearch, setPlayerSearch] = useState({ username: ''});
    const debouncedSearchValue = useDebounce(playerSearch, 300); 

    const { 
        data: playerList,
        isFetching: playerFetching
      } = useGetPlayerSimpleListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 10
        },
        filters : {
            is_active: true,
            username: debouncedSearchValue.username,
            ...filterProp
        }
      },
      {
        skip: !debouncedSearchValue.username
      }
    );

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
            <SelectOption
                onChange={(value) => onChange(value)}
                onSearch={(value) => setPlayerSearch({ username: value })}
                isLoading={playerFetching}
                placeholder={t('referencefield.Please select player!')}
                options={playerList && playerList.list.map(item => ({
                    value: `${item.id}, ${item.wallet_id}`,
                    label: `${item.username} (${item.wallet_balance}) [${item.sites_name}]`
                }))}
                width={'100%'}
                notFoundContent={t("referencefield.Please Search player first")}
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default ReferencePlayerField