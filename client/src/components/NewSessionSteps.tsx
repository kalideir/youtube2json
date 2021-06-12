import React from 'react';
import { Steps } from 'antd';
import { CheckOutlined, SettingOutlined, FileDoneOutlined } from '@ant-design/icons';


const { Step } = Steps; 



const NewSessionSteps = () => {
    return (
      <div className="new-session-steps">
        <Steps>
          <Step status="process" title="Configuration" icon={<SettingOutlined />} />
          <Step status="process" title="Extract Videos & Transcripts" icon={<FileDoneOutlined />} />
          <Step status="process" title="Topic Modeling" icon={<CheckOutlined />} />
          <Step status="process" title="Visualization" icon={<CheckOutlined />} />
        </Steps>
      </div>
    )
}

export default NewSessionSteps;