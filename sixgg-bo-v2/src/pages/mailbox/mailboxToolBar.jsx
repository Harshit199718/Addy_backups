import { Row, Col } from 'antd';
import CreateMailbox from './CreateMailbox';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import SendMail from './mail/SendMail';

const MailboxToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={13} sm={12} md={12} lg={12} xl={12} xxl={12} align={"left"}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width= "100%"
          />
        </Col>
        <Col>
          <Row gutter={[12, 12]}>
            <Col>
              <SendMail t={t} />
            </Col>
            <Col>
              <CreateMailbox t={t} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default MailboxToolBar;
