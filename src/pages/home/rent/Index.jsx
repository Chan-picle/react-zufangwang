import React, { useCallback } from 'react';
//hooks 方法
import {useEffect,useState} from "react";
import {useHistory} from "react-router-dom";
import Storage from "@/utils/storage.js";
import {getRentList} from "@/utils/api.js";
//组件
import SortBar from "./UI/SortBar";
import RentList from "./UI/RentList";
//UI 样式
import { NavBar,WingBlank,Toast} from 'antd-mobile';
import "./styled.less";

const cityId = Storage.get("city").id; //城市id
const Index = () => {
  const [city,setCity] = useState("杭州");
  const [areaId,setAreaid] = useState("");//区域id
  const [priceRange,setPrice] = useState("0,50000");//价格区间
  const [sort,setSort] = useState(1); //排序规则

  const [rentList,setRentList] = useState([]);//首页房屋信息列表

  const his = useHistory();
  useEffect(()=>{
    Storage.get("city") && setCity(Storage.get("city").cityname)
  },[])
  //请求首页列表
  useEffect(()=>{
    (async()=>{
      const res = await getRentList({cityId,areaId,price:priceRange,sort});
      setRentList(res.result)
    })()
  },[cityId,areaId,priceRange,sort])
  //重新选择城市
  const toChoseCity = ()=>{
    his.push("/city")
  }

  //接收从sortBar传递的参数,改变rent请求中的依赖
  const receive = useCallback((param)=>{
    switch(typeof param){
      case "object":
          setPrice(param.join());
          break;
      case "number":
        setAreaid(param);
        break;
      default:
        Toast.info('暂不支持该功能', 1);
    }

  })
  return (
    <section className="home-city">
      <header>
        <NavBar
          mode="light"
        >{city}租房</NavBar>
      </header>
      {/* 搜索框 */}
      <WingBlank>
        <div className="searchWarp">
          <div onClick={toChoseCity}>{city}<span className="iconfont icon-common_icon_up"></span></div>
          <div>|<span className="iconfont icon-sousuo"></span>请输入区域、地点或公寓名称</div>
        </div>
      </WingBlank>
      {/* 条件过滤框 */}
      <SortBar receiveParam={receive}/>
      {/* 租房信息列表 */}
      <RentList rentList={rentList}/>
      
    </section>
  );
}

export default Index;