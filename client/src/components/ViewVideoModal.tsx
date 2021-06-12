import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";


const ViewVideoModal = ({visible, setVisible}: any) => {
  

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [content, setContent] = useState<any>({});

  const { videos, currentVideo } = useSelector(
    (state: RootStateOrAny) => state.sessions
  );

  useEffect(() => {
    const video = videos.find((vid: any) => vid.id === currentVideo);
    console.log(video, currentVideo)
    if (video) {
      setContent(video);
    }
  }, [currentVideo])

  return (
    <div>
      <Modal title={content.title} style={{ height: 500, top: 20}} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <iframe width="100%" height={350} title={content.title} src={`https://www.youtube.com/embed/${content.v}`} />
      </Modal>
    </div>
  );
};

export default ViewVideoModal;
