import React,{memo} from 'react';
import {useHistory} from "react-router-dom";

//UI
// import { WingBlank} from 'antd-mobile';

const RentList = memo((props) => {
  const his = useHistory();
  const toDetail =(id)=>{
    return ()=>{
      his.push("/detail/"+ id)
    }
  }
  return (
    <div className="rentListWrap">
      {/* <WingBlank style={{width:"100%"}}> */}
        <ul className="rentContainer">
        {props.rentList.map(elm=>{
          return (
              <li key={elm.id} className="bottomborder" onClick={toDetail(elm.id)}>
                <img src={elm.img} alt=""/>
                <div className="textWrap">
                  <div className="textContainer">
                    <h4>{elm.title}</h4>
                    <p>{elm.address.join("-")}</p>
                    <p>{elm.tags.map((elm,i)=>{
                      return (<span key={i} className="tag">{elm}</span>)
                    })}</p>
                    <div>
                      <span className="price" style={{color:"red"}}>{elm.minPrice===elm.maxPrice ? (elm.minPrice): (elm.minPrice +  "-"  +elm.maxPrice )}元/月</span>
                      <span style={{float:"right",fontSize:"15px",color:"#999"}}>{elm.roomsCount}套房 &gt;</span>
                    </div>
                  </div>
                </div>
                
              </li>
            )
        })}
        </ul>
      {/* </WingBlank> */}
      </div>
  );
})

export default RentList;