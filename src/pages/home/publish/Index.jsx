/* eslint-disable */
import React, {useState} from 'react';
import { NavBar,  Button, WingBlank  } from 'antd-mobile';
import "./styled.less";

const Index = () => {
  const [phone,setPhone] = useState();
  const [vertify,setVertify] = useState();

  const handlePhone = (e)=>{
    setPhone(e.target.value);
  }
  const handleVertify = (e)=>{
    setVertify(e.target.value);
  }
  return (
    <div className="publishContainer">
    <NavBar
    mode="light"
    >发布房源</NavBar>
    <form action="POST">
      <WingBlank>
        <input type="text" placeholder="请输入手机号" value={phone} onChange={handlePhone}/>
        <input type="text" placeholder="请输入手机验证码" value={vertify} onChange={handleVertify}/>
        <Button type="warning" style={{color:"#fff"}}>下一步</Button>
      </WingBlank>
    </form>
  </div>
  );
}

export default Index;