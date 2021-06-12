import React, {useEffect, useRef, useMemo, useState} from 'react'
import {useDispatch,useSelector, RootStateOrAny} from 'react-redux'
import { Form, Input, Button } from 'antd';
import * as TYPES from "../store/types";



type RequiredMark = boolean | 'optional';


const NewSessionForm = () => {
    const dispatch = useDispatch(); 
    const [form] = Form.useForm();  
    const [formSuccess, setFormSuccess] = useState(false);
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    const ws = useRef<WebSocket>(); 
  
    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
      setRequiredMarkType(requiredMarkValue);
    };

    useEffect(() => {
      ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/session/new`);
      ws.current.onopen = () => {
        console.log('connected')
      };
      ws.current.onmessage = (evt: any) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        dispatch({
          type: TYPES.SET_VIDEOS_RESULTS,
          payload: {
            videos: data,
            currentSession: {...form.getFieldsValue()}
          }
        });
      };
    }, [])

    const createNewSession = () => {
      const vals = form.getFieldsValue();
      console.log(vals);
      const ev : string = JSON.stringify(vals)
      if (ws.current)  {
          ws.current.send(ev)
      }
    }

    return (
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          initialValues={{  
              url : 'https://www.youtube.com/c/JamesJani/videos',
              sessionName : 'JamesJani'
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <div className="header">
            <h3>YouTube Channel Name + URL</h3>
            <Button type="text">reset</Button> 
          </div>
          <div className="form">
            <Form.Item required className="item" name="sessionName" tooltip="">
              <Input className="input" placeholder="Session Name" />
            </Form.Item>
            <Form.Item required className="item" name="url" tooltip="">
              <Input className="input" placeholder="YouTube Channel Videos URL" />
            </Form.Item>
            <Form.Item>
              <Button className="submit-button" onClick={createNewSession} type="primary">Fetch All Videos</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    )
}

export default NewSessionForm;