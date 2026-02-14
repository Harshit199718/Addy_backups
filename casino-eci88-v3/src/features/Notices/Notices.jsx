import React, { useEffect, useState } from "react";
import { useGetNoticesQuery } from "../../api/hooks";
import Modal from "../../components/common/Modal";
import Image from "../../components/common/Image";
import Button from "../../components/common/Button";

function Notice({ index, notice, currentNoticeId, showNext }) {
  return (
    <Modal
      isOpen={currentNoticeId === notice.id}
      onClose={() => showNext(index + 1)}
    >
      <img src={notice?.image_sm} alt="" width="100%" />
      {notice?.links?.map((link) => {
        let text = link.split(",")
        text= text[0].split(":")[1]
        let noticeLink = link.split(",")
        noticeLink= noticeLink[1].split(":")[1]
        return <a key={link} target="_blank" href={`https://${noticeLink}`}><Button>{text}</Button></a>;
      })}
    </Modal>
  );
}
function Notices() {
  const { data: notices } = useGetNoticesQuery();
  const [currentNoticeId, setCurrentNoticeId] = useState(null);
  useEffect(() => {
    setCurrentNoticeId(notices?.popups[0]?.id);
  }, [notices]);

  const showNext = (index) => {
    setCurrentNoticeId(notices?.popups[index]?.id);
  };
  return (
    <>
      {notices?.popups?.map((notice, index) => (
        <Notice
          key={notice.id}
          index={index}
          notice={notice}
          currentNoticeId={currentNoticeId}
          showNext={showNext}
        />
      ))}
    </>
  );
}

export default Notices;
