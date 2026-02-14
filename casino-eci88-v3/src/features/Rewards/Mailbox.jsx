import React, { useState } from 'react'
import { useGetMailsQuery, useUpdateMailMutation } from '../../api/hooks'
import Loading from '../../components/common/Loading';
import { Mail, MailsContainer, Message } from './Mailbox.styled';
import NoData from '../../components/common/NoData';
import Modal from '../../components/common/Modal';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react'

function Mailbox({ mails, isLoading }) {
    const [updateMail] = useUpdateMailMutation();
    const [message, setMessage] = useState("")
    const { t } = useTranslation();
  return (
    <MailsContainer>
      <Loading isLoading={isLoading} fullscreen={false} />
      {
        mails?.length?mails?.map(mail=>(
            <Mail key={mail.id} onClick={() => {
                setMessage(mail?.message);
                updateMail({id: mail.id, payload: {...mail, is_read: true}})
            }}>
                <h3 className="title"><span>{t("Title")}: </span>{mail?.title}</h3>
                <h3 className="title"><span>{t("From")}: 
                  </span>{mail?.sender}
                  <Icon icon={mail?.is_read ? "fluent:mail-read-16-regular" : "fluent:mail-unread-12-regular"}width="1.2rem" height="1.2rem" />
                </h3> 
            </Mail>
        )):null
      }
      {
        !mails?.length && !isLoading?
        <NoData icon="lucide:message-square-x" message={t("No Messages")} />
        :null
      }
      <Modal title="Message" isOpen={message} onClose={() => setMessage("")}>
        <Message>
            <span>{t("Message")}:</span>
            <div dangerouslySetInnerHTML={{__html: message}} />
        </Message>
      </Modal>
    </MailsContainer>
  )
}

export default Mailbox