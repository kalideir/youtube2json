import React from 'react';
import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: "center" as const,
  fontSize: 14,
};

const BackToTop = () => {
    return (
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    )
}

export default BackToTop;  