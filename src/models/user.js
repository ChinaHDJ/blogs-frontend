import NotificationManager from "@/lib/SnackbarApi/NotificationManager";
import RequestApi from '@/lib/RequestApi';

export default {
  namespace: 'user',
  state: {},
  effects: {
    *login({ payload }, { put }){
      if (!RequestApi.getUserToken()){
        const response = yield put.resolve({
          type: 'request/post',
          payload
        });

        const { data: { success, message, token } } = response;

        if (success){
          localStorage.setItem('user_token', token);
        }

        NotificationManager.info({ message: message });
        return;
      }

      NotificationManager.info({ message: "你已经登录过了。请注销之后再登入" })
    },
    *curr(_none, { put }){
      const token = this.getUserToken();
      if (!token){

        yield put.resolve({
          type: 'request/get',

        });
        return
      }

      return null;
    }
  }
}
