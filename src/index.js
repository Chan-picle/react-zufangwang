import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import "lib-flexible";
import "@/assets/style/reset.less";
import "@/assets/iconfonts/iconfont.css";

import Router from "@/router/index"

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById("root")
);
