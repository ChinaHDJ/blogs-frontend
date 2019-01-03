import React, { Component } from 'react';
import  _ from  'lodash';
import { connect } from 'dva';
import { withSnackbar } from 'notistack';

@connect(({ Notification: { notifications } }) => ({ notifications }))
class Notifier extends Component {
  state = {
    displayed: [],
  };

  constructor(props){
    super(props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps,prevState,snapshot)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps,nextState,nextContext)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps,prevState)
    return nextProps
  }

  storeDisplayed = (key) => {
    this.setState(({ displayed }) => ({
      displayed: [...displayed, key],
    }));
  };

  render() {
    const { notifications, enqueueSnackbar, dispatch } = this.props;
    _.forEach(notifications, notification => {
      enqueueSnackbar(notification.message);
      new Promise(resolve => {
        dispatch({ type: 'Notification/deleteNotice', payload: {}, key: notification.key }).then(data => resolve(data))
      }).then(data => console.log(data))
    });
    return null;
  }
}
export default withSnackbar(Notifier)
