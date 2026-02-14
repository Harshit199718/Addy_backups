import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch, Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { subAgentPrimaryContact } from '../../customField/customOption';
import ReferenceAffiliatesParentField from '../../customField/ReferenceAffiliatesParentField';
import { useAddSubAgentMutation } from '../../features/affiliates/affiliatesApiSlices';
import { useGetUserGroupsListQuery } from '../../features/usergroups/usergroupsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, record, t }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    let position_taking = 100;

    if (record && record.name === "superagent") {
        position_taking = 100;
    } else {
        position_taking = position_taking - 5;
    }

    const handlePositionTakingInputChange = (event) => {
        let inputValue = event.target.value;

        if (inputValue.length >= 2 && !isNaN(inputValue)) {
          let parsedValue = parseFloat(inputValue);

          if (parsedValue > position_taking) {
            parsedValue = position_taking;
          } else if (parsedValue < 0) {
            parsedValue = 0;
          } else {
            parsedValue = Math.floor(parsedValue / 5) * 5;
          }

          event.target.value = parsedValue.toString();
        }
    };

    const initialValues = record && {
    position_taking: position_taking,
    parent: record.id,
    primary_contact: '1',
    }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
        <Row gutter={[16, 16]}>
            <Col span={12}>  
                <Form.Item
                    label={t("common.Upline")}
                >
                    <ReferenceAffiliatesParentField name="parent" apiErrors={apiErrors && apiErrors.parent} />
                </Form.Item>
                <Form.Item
                    name="username"
                    label={t("createsubagent.User ID")}
                    validateStatus={apiErrors.username ? 'error' : ''}
                    help={apiErrors.username}
                    rules={[
                        {
                            required: true,
                            message: `${t("requiredmessage.'Please input the user ID'")}`
                        },
                    ]}
                    hasFeedback
                    style={{ marginTop: '-27px' }} // Set marginTop here
                >
                    <Input placeholder={t("createsubagent.User ID")} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={t("common.Password")}
                    validateStatus={apiErrors.password ? 'error' : ''}
                    help={apiErrors.password}
                    rules={[
                        {
                            required: true,
                            message: `${t("requiredmessage.Please input the password")}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder={t("common.Password")} />
                </Form.Item>
                <Form.Item
                    name="cpassword"
                    label={t("common.Confirm Password")}
                    dependencies={['password']} // Add dependencies here
                    validateStatus={apiErrors.password2 ? 'error' : ''}
                    help={apiErrors.password2}
                    rules={[
                        {
                            required: true,
                            message: `${t("requiredmessage.Please input the confirm password")}`,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('common.The passwords do not match!')));
                        },
                        }),
                        ]}
                    hasFeedback
                >
                    <Input.Password placeholder={t("common.Confirm Password")} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label={t("common.Name")}
                    validateStatus={apiErrors.name ? 'error' : ''}
                    help={apiErrors.name}
                    rules={[
                        {
                            required: true,
                            message: `${t("requiredmessage.Please input the name")}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder={t("common.Name")} />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label={t("common.Mobile Number")}
                    validateStatus={apiErrors.mobile ? 'error' : ''}
                    help={apiErrors.mobile}
                    rules={[
                        {
                            required: true,
                            message: `${t("requiredmessage.Please input the mobile")}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder={t("common.Mobile Number")} />
                </Form.Item>
                <Form.Item
                    name="is_active"
                    label={t("common.Active")}
                >
                    <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
                </Form.Item>
            </Col>
            <Col span={12}>  
                <Form.Item
                    name="position_taking"
                    label={`${t("affiliate.Position")} (${t("createsubagent.Max")}: ${position_taking})`}
                    validateStatus={apiErrors.position_taking ? 'error' : ''}
                    help={apiErrors.position_taking}
                    hasFeedback
                >
                    <Input 
                        type='number' 
                        placeholder={t("affiliate.Position")}
                        step={5} 
                        min={0} max={position_taking} 
                        onChange={handlePositionTakingInputChange}/>
                </Form.Item>
                <Form.Item
                    name="primary_contact"
                    label={t("createsubagent.Primary Contact")}
                    validateStatus={apiErrors.primary_contact ? 'error' : ''}
                    help={apiErrors.primary_contact}
                    hasFeedback
                >
                    <Select
                        placeholder={t("createsubagent.Primary Contact")}
                        options={subAgentPrimaryContact(t)}
                    />
                </Form.Item>
                <Form.Item
                    name="contact1_link"
                    label={t("createsubagent.Contact Link 1")}
                    validateStatus={apiErrors.contact1_link ? 'error' : ''}
                    help={apiErrors.contact1_link}
                    hasFeedback
                >
                    <Input placeholder={t("createsubagent.Contact Link 1")} />
                </Form.Item>
                <Form.Item
                    name="contact2_link"
                    label={t("createsubagent.Contact Link 2")}
                    validateStatus={apiErrors.contact2_link ? 'error' : ''}
                    help={apiErrors.contact2_link}
                    hasFeedback
                >
                    <Input placeholder={t("createsubagent.Contact Link 2")} />
                </Form.Item>
                <Form.Item
                    name="contact3_link"
                    label={t("createsubagent.Contact Link 3")}
                    validateStatus={apiErrors.contact3_link ? 'error' : ''}
                    help={apiErrors.contact3_link}
                    hasFeedback
                >
                    <Input placeholder={t("createsubagent.Contact Link 3")} />
                </Form.Item>
                <ReferenceSiteField 
                    name="sites"
                    label={t("common.Sites")}
                    apiErrors={apiErrors && apiErrors.sites}
                />
            </Col>
        </Row>
    </Form>
    );
};Input.number

const FormModal = ({ open, onCreate, onCancel, apiErrors, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("createsubagent.Create Sub Agent")}
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
        width={1000}
        style={{ top: 65 }}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        t={t}
      />
    </Modal>
  );
};

const CreateSubAgent = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateSubAgent, { isLoading }] = useAddSubAgentMutation();
    const dispatch = useDispatch()
    const pagination = useSelector((state) => state.filters.pagination);
    const filters = useSelector((state) => state.filters.filters);
    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const { 
        data: groupList,
        groupLoading,
        isFetching,
        isSuccess, 
        isError, 
        error
      } = useGetUserGroupsListQuery({
         pagination, 
         filters, 
      });

    const updatedRow = groupList?.list.find(item => item.id === record.id);

    const onCreate = async (values) => {
        if(values.parent === undefined){
            values.parent = null;
        }
        values.is_staff = false;
        values.groups = updatedRow.id;
        setApiErrors([])
        
    try {
        const data = await CreateSubAgent(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Sub Agent Created Successfully')}`}));
        setOpen(false);
    } catch (error) {
        dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
        setApiErrors(errorField(error));
        }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            {t("createsubagent.Create Sub Agent")}
        </Button>
        <FormModal
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false)
                setApiErrors([])
            }}
            apiErrors={apiErrors}
            record={record && record}
            t={t}
        />
    </>
  );
};

export default CreateSubAgent;