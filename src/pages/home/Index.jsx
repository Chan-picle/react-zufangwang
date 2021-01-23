/* eslint-disable */
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.less";

const list = [{
  title: "我要租房",
  path: "/home/rent",
  icon:"iconfont icon-fang"
}, {
  title: "我要预约",
  path: "/home/order",
  icon:"iconfont icon-yonghu"
}, {
  title: "发布房源",
  path: "/home/publish",
  icon:"iconfont icon-fangchan"
}]

const Index = (props) => {
  
  return (
    <div className="home">
      <div className="router-view">{props.children}</div>
      <footer className="border">
        <nav>
          {
            list.map(item => (<li key={item.path}>
              <NavLink to={item.path}>
              <span className={item.icon}></span>
                {item.title}</NavLink>
            </li>))
          }
        </nav>
      </footer>
    </div>
  );
};

export default Index;
