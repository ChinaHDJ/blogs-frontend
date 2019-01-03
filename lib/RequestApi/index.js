import axios from 'axios';
import React from 'react';
import { connect } from 'dva';
import NotificationManager from "../SnackbarApi/NotificationManager";

class RequestApi{

  request(method, payload){

  }

  get(url,payload){
    console.log('get '+ url)
    axios.get(url).then(console.log);
  }

  post(payload){

  }

  Token = new class {
    constructor(RequestApi){
      this.RequestApi = RequestApi;
    }

    getCurrToken(){
      return localStorage['token'] || sessionStorage['token'];
    }

    requestToken(email, password, captcha){
      if (!this.getCurrToken()){
        this.RequestApi.get('www.baodu.com');
        return;
      }

      NotificationManager.info("你已经登录过了。请注销重新登入")
    }
  }(this)

}

export default new RequestApi();
