import React from "react";

import "./styled.less";
import { NavBar, Icon,WingBlank } from 'antd-mobile';

import {useHistory} from "react-router-dom";
import {useEffect,useState} from "react";

import {getCities} from "@/utils/api.js";
import Storage from "@/utils/storage.js";
const Index = () => {
  const [cityList,setList] = useState([]);
  const his = useHistory();
  useEffect(()=>{
    (async()=>{
      const res =await getCities();
      if(res.status===0){
        setList(res.result)
      }
    })()
  },[])
  // 回退前一个页面
  const goBack = ()=>{
    his.go(-1);
  }
  //选择城市，写入localStorage
  const choseCity =(id,cityname)=>{
    return ()=>{
      Storage.set("city",{id,cityname});
      his.push("/home");
    }
  }
  return (<section className="chose-city">
    <header>
    <NavBar
      mode="light"
      icon={his.length>1?(<Icon type="left" style={{color:"#000"}} />):null}
      onLeftClick={goBack}
    >租房网</NavBar>
    </header>
    <WingBlank>
      <div className="c-container">
        <h3>选择城市</h3>
        <ul>
            {cityList.map(elm=>{
              return (<li key={elm.id} onClick={choseCity(elm.id,elm.city)}>{elm.city}</li>)
            })}
        </ul>
      </div>
    </WingBlank>
  </section>);
};

export default Index;
