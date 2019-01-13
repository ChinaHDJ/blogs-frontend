import { NotificationManager } from '../SnackbarApi';
import RequestApi from 'index';

class Token {

  getCurrToken(){

    return localStorage['token'] || !sessionStorage['token'];
  }

  requestToken(email, password, captcha){
    if (!this.getCurrToken()){
      RequestApi.get('www.baodu.com');
      return;
    }

    NotificationManager.info("你已经登录过了。请注销重新登入")
  }

}

export default new Token();
