import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'dva';

let lastKey = 0;

function showNoticeSnackbar() {
  
}

/**
 * @return {null}
 */
class NoticeSnackbar extends React.Component{
  state = {
    open: false,
  };

  currKey = 0;

  handleClick = () => {
    this.setState({ open: false });
  };

  handleClose = (event, reason) => {
    const { dispatch } = this.props;

    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
    dispatch({
      type: 'Notification/deleteNotice',
      key: this.currKey
    })
  };

  render() {
    const { notifications, currKey } = this.props.Notification;
    const notification =  notifications[currKey];
    console.log(notification, notifications, currKey)
    if (notification && currKey!== this.state.currKey){
      this.setState({
        currKey,
        notifications,
        open: true,
      })
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={4000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">123</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClick} >
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
          />
        ]}
      />
    );
  }
}

export default connect(state => ( state))(NoticeSnackbar);
