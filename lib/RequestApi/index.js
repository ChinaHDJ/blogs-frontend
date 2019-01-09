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

  post(url, body){
    console.log(123)
    return axios.post(url, body);
  }

  Token = new class {
    constructor(RequestApi){
      this.RequestApi = RequestApi;
    }

    getCurrToken(){
      return localStorage['token'] || sessionStorage['token'];
    }

    requestToken(payload){
      if (!this.getCurrToken()){
        this.RequestApi.post('/api/v1/sessions',payload).then(({ data: { data: { attributes: { success, message, token } } }}) => {

          if (success){
            localStorage.setItem('token', token);
          }

          NotificationManager.info({ message: message })
        });

        return;
      }

      NotificationManager.info({ message: "你已经登录过了。请注销重新登入" })
    }
  }(this)

}

export default new RequestApi();
