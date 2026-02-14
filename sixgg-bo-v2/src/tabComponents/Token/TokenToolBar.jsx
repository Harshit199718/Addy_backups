import { Row, Col, Button, Popconfirm, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersTabActions } from '../../features/filtersTabSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import SearchBar from '../../customToolbar/SearchBar';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import { useAddTokenMutation } from '../../features/token/tokenApiSlices';
import { notification } from '../../features/modalSlice';


const TokenToolBar = ({ isLoading, t, player }) => {
    const dispatch = useDispatch();
    const [expiredDate, setExpiredDate] = useState(dayjs().add(2, 'day').startOf('day'))
    const [Create, { isTokenLoading }] = useAddTokenMutation();
    
    const onCreateToken = async (values) => {
      try {
        const data = await Create(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message:  `${t("notisuccess.Bank Created Succesfully")}`}));
      } catch (error) {
        dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
        setApiErrors(errorField(error));
      }
    };

    return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={4} >
          <SearchBar
            onChange={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} >
          <FormToDatePicker 
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'toDate' }))}
            defaultToday={true}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} align="right">
          <Popconfirm
              icon={<FileAddOutlined />}
              title={`${t("token.Add Token to")} ${player?.username}`}
              description={
                <div> 
                  <span>{t("Expired At")}</span>
                  <DatePicker 
                    value={expiredDate} 
                    onChange={(date) => setExpiredDate(dayjs(date).startOf('day'))}
                    style={{ width: '100%' }}
                  />
                </div>
              }
              ok
              okText={t("common.Add")}
              cancelText={t("common.Cancel")}
              onConfirm={() => onCreateToken({
                player: player?.id,
                expire_at: expiredDate
              })}
              placement="left"
            >
              <Button type='primary'>{t("common.Add")}</Button>
            </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}

export default TokenToolBar;
