import axios from 'axios';
import React from 'react';
import normalize from 'jsonapi-normalizer'
import NotificationManager from "../SnackbarApi/NotificationManager";

class RequestApi{

  request(method, payload){

  }

  JsonapiNormalizer = class {
    constructor(requestApi){
      this.requestApi = requestApi;
    }

    get(url,payload){
      return this.requestApi.get(url,payload).then(({ data }) => normalize(data));
    }

    post(url, body){
      return this.requestApi.post(url,body).then(({ data }) => normalize(data));
    }
  };

  getUserToken(){
    return localStorage['user_token'];
  }

  get(url,payload){
    console.log('get '+ url)
    return axios.get(url);
  }

  post(url, body){
    return axios.post(url, body);
  }

  getCurrUser(){
    const token = this.getUserToken();
    if (!token){

      this.get('/api/v1/user', {
        token,
      });
      return
    }

    return null;
  }

  requestToken(payload){
    if (!this.getUserToken()){
      this.post('/api/v1/sessions',payload).then(({ data: { success, message, token } }) => {
        if (success){
          localStorage.setItem('user_token', token);
        }

        NotificationManager.info({ message: message });
      });

      return;
    }

    NotificationManager.info({ message: "你已经登录过了。请注销之后再登入" })
  }
}

export default new RequestApi();
