/* eslint-disable */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "@/App";

import Home from "p/home/Index";
import Detail from "p/details/Index";
import Cities from "p/cities/Index";

import Rent from "p/home/rent/Index";
import Order from "p/home/order/Index";
import Publish from "p/home/publish/Index";

const Auth = (props) => {
  return (
    <Route path={props.path} render={() => {
      return localStorage.getItem('city') ? 
        ( props.children ) : 
        (<Redirect from={props.path} to="/city"></Redirect>)
    }}></Route>
  )
}

const Router = () => {
  return (
    <App>
      <Switch>
        <Redirect from="/" to="/home" exact></Redirect>
        <Auth path="/home">
          <Home>
            <Switch>
              <Redirect from="/home" to="/home/rent" exact></Redirect>
              <Route path="/home/rent"><Rent></Rent></Route>
              <Route path="/home/order"><Order></Order></Route>
              <Route path="/home/publish"><Publish></Publish></Route>
            </Switch>
          </Home>
        </Auth>
        <Route path="/detail/:id"><Detail></Detail></Route>
        <Route path="/city"><Cities></Cities></Route>
      </Switch>
    </App>
  );
};

export default Router;
