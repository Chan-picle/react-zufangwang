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
  useEffect(()=>{
    (async()=>{
      const res = await getDetail(cityId,id);
      console.log(res)
      setDetail(res.result);
      setTitle(res.result.title);
    })()
  },[id])
  //返回上一级
  const goBack = ()=>{
    his.goBack();
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

      </div>
      <div className="main-bottom">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, odio pariatur voluptate minus sit odit alias cumque eos ad mollitia hic illo itaque atque perferendis consequuntur a officia praesentium reprehenderit laboriosam eveniet minima eum possimus? Enim omnis aut, provident voluptate soluta vitae molestias voluptates illum numquam perferendis ut dicta ad quibusdam pariatur nihil explicabo, nemo reprehenderit necessitatibus possimus accusantium. Cumque esse voluptatum libero iusto alias est beatae quaerat culpa. Beatae ipsum repellat, provident sit ex qui aliquid magni architecto unde exercitationem natus optio inventore tempore. Corrupti saepe doloremque nam, sunt vero cum quam iusto aliquam nulla eum consequatur ab deleniti?
      </div>
    </div>
    <div className="">
      <WingBlank size="lg" >
        <Button type="warning" style={{color:"#fff"}}>预约看房</Button>
      </WingBlank >
    </div>
  </div>);
};

export default Index;
