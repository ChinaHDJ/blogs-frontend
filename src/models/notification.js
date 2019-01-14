import _ from 'lodash';
import { message } from 'antd';
import { NotificationContainer, NotificationManager } from '../lib/SnackbarApi';

let keyCount = 0;

export default {
  namespace: 'Notification',
  state: {
    currKey: 0,
    notifications: {},
  },
  effects: {
    *createNotice({ payload }, { put }) {
      const { type, message, options, action } = payload;

      yield put.resolve({
        type: 'addNotice',
        key: 0,
        payload: {
          type,
          message,
          options,
          action,
        },
      });
      NotificationManager.info({ message: 'message' });
      return { key: 0 };
    },

    *deleteNotice({ key }, { put }) {
      console.log(key);
      yield put.resolve({
        type: 'removeNotice',
        key,
      });

      return { success: true };
    },
  },
  reducers: {
    addNotice({ notifications }, { key, payload }) {
      if (!notifications[key.toString()]) {
        notifications[key.toString()] = payload;
      }

      return { notifications, currKey: keyCount };
    },
    removeNotice({ notifications }, { key }) {
      console.log(_.filter(notifications, ({ key: stateKey }) => stateKey !== key), 'delete');
      return {
        notifications: {},
        currKey: 0,
      };
    },
  },
};
