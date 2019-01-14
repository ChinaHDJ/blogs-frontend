import { EventEmitter } from 'events';

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const Constants = {
  CHANGE: 'change',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

class NotificationManager extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
  }

  create(notify) {
    const defaultNotify = {
      id: createUUID(),
      type: 'info',
      title: null,
      message: null,
      timeOut: 4000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    };

    this.queue.push(Object.assign(defaultNotify, notify));
    this.emitChange();
  }

  info(message, title, timeOut, onClick) {
    this.create({
      type: Constants.INFO,
      message,
      title,
      timeOut,
      onClick,
    });
  }

  info(json) {
    this.create(Object.assign(json, { type: Constants.INFO }));
  }

  success(message, title, timeOut, onClick) {
    this.create({
      type: Constants.SUCCESS,
      message,
      title,
      timeOut,
      onClick,
    });
  }

  success(json) {
    this.create(Object.assign(json, { type: Constants.SUCCESS }));
  }

  warning(message, title, timeOut, onClick) {
    this.create({
      type: Constants.WARNING,
      message,
      title,
      timeOut,
      onClick,
    });
  }

  warning(json) {
    this.create(Object.assign(json, { type: Constants.WARNING }));
  }

  error(message, title, timeOut, onClick) {
    this.create({
      type: Constants.ERROR,
      message,
      title,
      timeOut,
      onClick,
    });
  }

  error(json) {
    this.create(Object.assign(json, { type: Constants.ERROR }));
  }

  remove(messageObject) {
    this.queue = this.queue.filter(n => messageObject.id !== n.id);
    this.emitChange();
  }

  emitChange() {
    this.emit(Constants.CHANGE, this.queue);
  }

  addChangeListener(callback) {
    this.addListener(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new NotificationManager();
