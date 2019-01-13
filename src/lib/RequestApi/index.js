import axios from 'axios';
import NotificationManager from "../SnackbarApi/NotificationManager";

class RequestApi{

  static request(method, payload){
    const { url, params, data } = payload;
    console.log(params, data, payload);
    return axios({
      method,
      url,
      params,
      data,
    })
  }

  getUserToken(){
    return localStorage['user_token'];
  }
}

['get','post', 'put', 'delete'].forEach(method => {
  RequestApi.prototype[method] = async function(payload) {
    return RequestApi.request(method, payload)
  }
});

export default new RequestApi();
