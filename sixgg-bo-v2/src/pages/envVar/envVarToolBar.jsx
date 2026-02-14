import { Row, Col, Space, Button, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';
import { useGetEnvironmentVariablesModulesListQuery } from '../../features/envVar/envVarApiSlices';
import { useState } from 'react';

const EnvVarToolBar = ({ isLoading, handleAddNewRow, t }) => {
  const dispatch = useDispatch();
  const [selectedItemID, setSelectedItemID] = useState(null);
  const { 
    data: list,
    isLoading: envVarModuleLoading, 
    isFetching: envVarModulefetching,
  } = useGetEnvironmentVariablesModulesListQuery();

  return (
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={6} lg={4} xl={3} xxl={3} style={{ marginBottom: "10px" }}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100px"}
          />
        </Col>
        <Col xs={24} sm={12} md={20} lg={17} xl={18} xxl={18}>
        <Row gutter={[8, 8]}>
            {envVarModulefetching ? (
              <Spin />
            ) : (
              list?.map((item, index) => (
                <Col key={item?.id} xs={8} sm={12} md={8} lg={4} xl={3} xxl={3}>
                  <Button 
                    type={selectedItemID === item.id ? 'primary' : 'default'} 
                    onClick={() => {
                      if(selectedItemID === item.id ){
                        setSelectedItemID(null)
                        dispatch(filtersActions({value: null, type: 'input', event: 'module'}))
                      } else {
                        setSelectedItemID(item.id)
                        dispatch(filtersActions({value: item.module, type: 'input', event: 'module'}))
                      }
                    }}
                    style={{ width: "100%", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {item?.module?.toUpperCase()}
                  </Button>
                </Col>
              ))
            )}
          </Row>
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_environvar',
        <Col xs={24} sm={12} md={2} align="right">
          <Button type="primary" onClick={handleAddNewRow}>{t("common.Create")}</Button>
        </Col>
        )}
      </Row>
  );
}

export default EnvVarToolBar;
