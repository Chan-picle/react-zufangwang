import React,{useEffect,useState} from "react";
import {useParams,useHistory} from "react-router-dom";

import {getDetail} from "@/utils/api"; 
import storage from "@/utils/storage";

import "./styled.less";
import { NavBar, Icon, Button, WingBlank  } from 'antd-mobile';

const cityId = storage.get("city").id;

const Index = () => {
  const his = useHistory();
  let {id} = useParams();
  const [detail,setDetail] = useState({});
  const [title,setTitle] = useState("");
  const [isShow,setIsShow] = useState(false);
  useEffect(()=>{
    (async()=>{
      const res = await getDetail(cityId,id);
      console.log(res.result)
      setDetail(res.result);
      setTitle(res.result.title);
    })()
  },[id])
  //返回上一级
  const goBack = ()=>{
    his.goBack();
  }
  //显示地图
  const show = ()=>{
    setIsShow(isShow=>!isShow);
  }
  return (
  <div className="detailContainer">
    <NavBar
          mode="light"
          icon={<Icon type="left" style={{color:"#000"}} />}
          onLeftClick={goBack}
        >{title}</NavBar>
    <div className="order-main">
      <div className="main-top">
        {
          JSON.stringify(detail)==="{}" 
          ? <p>loading....</p> 
          :(<div className="top">
            <img src={detail.img} alt=""/>
            <WingBlank>
            <section>
              <h4>{detail.title}</h4>
              <p className="o-price">
                <span className="price" style={{color:"red"}}>{detail.minPrice===detail.maxPrice ? (detail.minPrice): (detail.minPrice +  "-"  +detail.maxPrice )}元/月</span>
                {detail.tags.map((elm,i)=>{
                      return (<em key={i} className="tag">{elm}</em>)
                })}
              </p>
              <div className="map"  onClick={show}>
                <span className="iconfont icon-map"></span>
                <span>{detail.address.join("-")}</span>
                <div className={isShow ? "showbtn showMap":"showbtn"}><span className="iconfont icon-navbar_icon_right"></span></div>
              </div>

              {/* 地图位置 */}
              <div className={isShow ? "mapConrainer" : "mapConrainer hiddenMap"} >
              </div>
            </section>
            </WingBlank>
          </div>)
        }
      </div>
      <div className="main-bottom">
       {
         JSON.stringify(detail)==="{}" 
         ? <p>loading....</p> 
         :(<section>
           <p><span>在租房源</span><span style={{float:"right"}}>筛选/排序</span></p>
           <ul>
             {
               detail.rooms.map((elm,i)=>{
                 return (<li style={{overflow:"hidden"}} key={i} className="bottomborder">
                   <img src={elm.img} alt="" style={{float:"left",height:"100px",width:"135px"}}/>
                   <div style={{display:"table-cell",width:"195px",height:"100px"}}>
                     <div className="roomMsg">
                        <h5>{elm.title}<span style={{color:"red",float:"right"}}>{elm.price}元/月</span></h5>
                        <p>{elm.size}平米 | 18平米</p>
                        <p><span>{elm.tags.join("  ")}</span></p>
                     </div>
                   </div>
                 </li>)
               })
             }
           </ul>
         </section>)
       }
      </div>
    </div>
    <div className="order-btn topborder">
      <WingBlank size="lg" >
        <Button type="warning" style={{color:"#fff"}}>预约看房</Button>
      </WingBlank >
    </div>
  </div>);
};

export default Index;
