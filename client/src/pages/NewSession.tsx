import React, {useState} from 'react'
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import { Divider } from 'antd'
import {Link} from 'react-router-dom'
import { NavBar, BackTop, NewSessionForm, VideosList, NewSessionSteps } from "../components";




const NewSession = () => {
    const [data, setData] = useState<Array<any>>([]);
    // const {} = useSelector((state: RootStateOrAny) => state.sessions);
    // const dispatch = useDispatch(); 
    const [loading, setLoading] = useState<boolean>(false); 
  
    
    return (
      <div className="new-session">
        <NavBar /> 
        <div className="content">
          <NewSessionForm />
          <Divider orientation="center" style={{color: '#183b56' }}>Channel Videos Result List</Divider> 
          <VideosList />
        </div>
        <BackTop />
      </div>
    )
}
 
export default NewSession;