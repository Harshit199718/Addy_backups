import { Form, Select, Spin, Transfer } from "antd";
import { useGetProductsListQuery } from "../features/products/productsApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceProductTransferField = ({ name, apiErrors, label="Product", disabled=false, mode=null, isRequired=true, filterProp={}, targetKeys=[] }) => {
    const { t } = useTranslation();
    const { 
        data: productList,
        isFetching 
    } = useGetProductsListQuery({
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
                dataSource={productList?.list}
                rowKey={(record) => record.id}
                showSearch
                filterOption={(inputValue, option) =>
                    option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.category.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.ltype.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                }
                listStyle={{
                    minWidth: 230,
                    height: 300,
                }}
                titles={[t('referencefield.Not Applied'), t('referencefield.Applied')]}
                targetKeys={targetKeys?.filter(key => key !== null)}
                render={(item) => `${item.name} (${item.category}) - ${item.ltype} [${item.sites_name}]`}
            />
            }
        </Form.Item>
    )
}

export default ReferenceProductTransferField