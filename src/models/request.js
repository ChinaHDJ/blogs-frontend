import RequestApi from '@/lib/RequestApi';
import createModel from '@/lib/utils/createModel';
import NotificationManager from '../lib/SnackbarApi/NotificationManager';

function* effectRequest(requestFunction) {
  return function* executeEffect({ payload }, { call, put }) {
    const { key } = payload;

    const { data } = yield call(requestFunction.get, url, payload);
  };
}

export default createModel({
  namespace: 'request',
  state: {},
  effects: {},
});
