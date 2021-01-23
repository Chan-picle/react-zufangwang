import React,{memo} from 'react';

import {useState,useEffect} from "react";
import {getAreaList} from "@/utils/api";
import storage from "@/utils/storage";
// 存放第二个价格区间数组
const priceRange = [
  {
    price:[0,50000],
    id:0,
    text:"不限"
  },
  {
    price:[0,1500],
    id:1,
    text:"1500元以下"
  },
  {
    price:[1500,2000],
    id:2,
    text:"1500-2000元"
  },
  {
    price:[2000,3000],
    id:3,
    text:"2000-3000元"
  },
  {
    price:[3000,5000],
    id:4,
    text:"3000-5000元"
  },
  {
    price:[5000,8000],
    id:5,
    text:"5000-8000元"
  },
  {
    price:[8000,50000],
    id:6,
    text:"8000元以上"
  }
]
const unitType = ["不限","一居","两居","三居","四居","四居以上"];
const more = ["整租","合租","短租"];

const SortBar = memo((props) => {
  //存放第一个subnav 城市区域
  const [areaList,setArea] = useState([]);
  const [which,setWitch] = useState(-1);
  let cityId = storage.get("city").id;
  useEffect(()=>{
    (async()=>{
        const res = await getAreaList(cityId);
        setArea(res.result);
    })()
  },[cityId]);

  const switchFilter = (num)=>{
    return ()=>{
      setWitch(num);
    }
  }
  //触发筛选
  const select = (param)=>{
    return ()=>{
      props.receiveParam(param);
      setWitch(-1);
    }
  }
  return (
    <div className="sortBar">
      <ul className="bar">
        <li onClick={switchFilter(0)} className={which===0 ? "chosen" : ""}>区域<span className="iconfont icon-common_icon_up"></span></li>
        <li onClick={switchFilter(1)} className={which===1 ? "chosen" : ""}>租金<span className="iconfont icon-common_icon_up"></span></li>
        <li onClick={switchFilter(2)} className={which===2 ? "chosen" : ""}>户型<span className="iconfont icon-common_icon_up"></span></li>
        <li onClick={switchFilter(3)} className={which===3 ? "chosen" : ""}>更多<span className="iconfont icon-common_icon_up"></span></li>
      </ul>
      {
        which>=0 &&
      <div className="subnav" onClick={(e)=>{e.target.nodeName==="DIV" && setWitch(-1)}}>
          <ul>
              {which===0&&areaList.map(elm=>{
                return <li key={elm.areaId} onClick={select(elm.areaId)}>{elm.areaName}</li>
              })}
              {which===1&&priceRange.map(elm=>{
                return <li key={elm.id} onClick={select(elm.price)}>{elm.text}</li>
              })}
              {which===2&&unitType.map((elm,i)=>{
                return <li key={i} onClick={select()}>{elm}</li>
              })}
              {which===3&&more.map((elm,i)=>{
                return <li key={i} onClick={select()}>{elm}</li>
              })}
          </ul>
      </div>
      }
    </div>
  );
})

export default SortBar;