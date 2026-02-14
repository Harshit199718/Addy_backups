import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ConvertImage from '../../components/convertImage';
import SelectOption from '../../customToolbar/SelectOption';
import { manualTransactionType } from '../../customField/customOption';
import DepositForm from './deposit/depositForm';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { useDepositCreateMutation } from '../../features/transaction/deposit/depositApiSlices';
import { useWithdrawalCreateMutation } from '../../features/transaction/withdrawal/withdrawalApiSlices';
import { useBonusCreateMutation } from '../../features/transaction/bonus/bonusApiSlices';
import { convertIDToArray } from '../../components/generalConversion';
import WithdrawalForm from './withdrawal/withdrawalForm';
import BonusForm from './bonus/bonusForm';
import { useDropTransactionDepositCreateMutation } from '../../features/transaction/dropTransactionDeposit/dropTransactionDepositApiSlices';
import DropTransactionDepositForm from './droptransactiondeposit/dropTransactionDepositForm';
import DropTransactionGamesForm from './droptransactiongames/dropTransactionGamesForm';
import { useDropTransactionGamesCreateMutation } from '../../features/transaction/dropTransactionGames/dropTransactionGameApiSlices';
import { useTranslation } from 'react-i18next';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
  const [form] = Form.useForm();
  const [selectedSite, ttype, player] = [
    'selectedSite',
    'ttype',
    'player',
  ].map(field => Form.useWatch(field, form));
  const manualTransactionTypeOption = manualTransactionType(t);

  useEffect(() => {
    const excludeFields = ['ttype', 'selectedSite'];
    const formFields = Object.keys(form.getFieldsValue());
    formFields.forEach(fieldName => {
      if (!excludeFields.includes(fieldName)) {
        form.resetFields([fieldName]);
      }
    });

  let initialValues
  switch(ttype){
    case 'MD':
      initialValues = {state: 'approved', remark: 'Wish you win big big, thanks you !!!', second_wallet_amount: 0}
    break;
    case 'MW':
      initialValues = {state: 'pending'}
    break;
    case 'BM':
      initialValues = {state: 'approved'}
    break;
    case 'DTD':
      initialValues = {state: 'approved'}
    break;
    case 'DTG':
      initialValues = {state: 'approved'}
    break;
    default:
      initialValues = {state: 'approved'}
  }

  form.setFieldsValue({
    state: initialValues?.state,
    remark: initialValues?.remark,
    second_wallet_amount: initialValues?.second_wallet_amount,
  });
  }, [ttype, selectedSite]);

  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  return (
    <>
      <Form layout="vertical" form={form} name="form_in_modal">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="ttype"
            >
              <SelectOption
                placeholder={t('common.Select Transaction Type')}
                options={manualTransactionTypeOption}
                width={'100%'}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <ReferenceSiteField 
              name="selectedSite" 
              label={null} 
              mode={null}
            />
          </Col>
        </Row>
        {selectedSite && (
          ttype === 'MD' ? <DepositForm apiErrors={apiErrors} selectedSite={selectedSite} form={form} t={t} /> 
          :
          ttype === 'MW' ? <WithdrawalForm apiErrors={apiErrors} selectedSite={selectedSite} t={t} /> 
          :
          ttype === 'BM' ? <BonusForm apiErrors={apiErrors} selectedSite={selectedSite} t={t} /> 
          :
          ttype === 'DTD' ? <DropTransactionDepositForm apiErrors={apiErrors} selectedSite={selectedSite} selectedPlayer={player} form={form} t={t} /> 
          :
          ttype === 'DTG' && <DropTransactionGamesForm apiErrors={apiErrors} selectedSite={selectedSite} t={t} /> 
        )}
      </Form>
    </>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("common.Create Transaction")}
      okText={t("common.Create")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onCreate(values);
        } catch (error) {
        }
      }}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const CreateTransaction = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [DepositCreate, { DepositLoading }] = useDepositCreateMutation();
  const [WithdrawalCreate, { WithdrawalLoading }] = useWithdrawalCreateMutation();
  const [BonusCreate, { BonusLoading }] = useBonusCreateMutation();
  const [DropTransactionDepositCreate, { DropTransactionDepositLoading }] = useDropTransactionDepositCreateMutation();
  const [DropTransactionGamesCreate, { DropTransactionGamesLoading }] = useDropTransactionGamesCreateMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])
  
  const onCreate = async (values) => {
  const [player, wallet] = convertIDToArray(values.player)
  const ttype = values.ttype;

  setApiErrors([])
  try {
    switch(ttype){
      case 'MD':
        values.player = player;
        values.wallet = wallet;
        values.proof = await ConvertImage(values.proof)
        const deposit = await DepositCreate(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Deposit Created Successfully')}));
        setOpen(false);
      break;
      case 'MW':
        values.player = player;
        values.wallet = wallet;
        values.req_amount = values.req_amount * -1;
        values.max_amount = values.req_amount;
        values.amount = 0;
        const withdrawal = await WithdrawalCreate(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Withdrawal Created Successfully')}));
        setOpen(false);
      break;
      case 'BM':
        values.player = player;
        values.player_id = player;
        values.wallet = wallet;
        const bonus = await BonusCreate(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Bonus Created Successfully')}));
        setOpen(false);
      break;
      case 'DTD':
        const [parent, amount] = convertIDToArray(values.parent)

        values.player = player;
        values.wallet = wallet;
        values.parent = parent;
        values.amount = amount;
        values.proof = await ConvertImage(values.proof)
        const droptransactiondeposit = await DropTransactionDepositCreate(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Drop Transaction Deposit Created Successfully')}));
        setOpen(false);
      break;
      case 'DTG':
        values.player = player;
        values.player_id = player;
        values.wallet = wallet;
        const droptransactiongames = await DropTransactionGamesCreate(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Drop Transaction Game Created Successfully')}));
        setOpen(false);
      break;
      default:
        dispatch(notification({notification_status: 'error', notification_message: t('notierror.Please Contact Support for further help')}));
    }

  } catch (error) {
    dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    setApiErrors(errorField(error));
  }
  }
  
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%" }}>
        {t("common.Create")}
      </Button>
      <FormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        t={t}
      />
    </>
  );
};
export default CreateTransaction;