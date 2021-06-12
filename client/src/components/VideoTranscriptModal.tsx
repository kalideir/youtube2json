import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";


const VideoTranscriptModal = ({visible, setVisible}: any) => {
  

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
      <Modal title={content.title} style={{ top: 20}} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p style={{height: '50vh', overflowY: 'scroll'}}>{content.transcript}</p>
      </Modal>
    </div>
  );
};

export default VideoTranscriptModal
