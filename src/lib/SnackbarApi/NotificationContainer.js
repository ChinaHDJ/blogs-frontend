import React from 'react';
import NotificationManager from './NotificationManager';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/es/styles/withStyles';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function NoticeSnackbarContentComponent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const NoticeSnackbarContent = withStyles(styles)(NoticeSnackbarContentComponent);

class NotificationContainer extends React.Component {
  state = {
    queue: [],
    messageObject: {},
    open: false,
  };

  componentWillMount() {
    NotificationManager.addChangeListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    NotificationManager.removeChangeListener(this.handleStoreChange);
  }

  handleStoreChange = queue => {
    if (this.state.open) {
      this.setState({
        open: false,
        queue,
      });
    } else {
      this.processQueue(queue);
    }
  };

  handleRequestHide = notification => {
    NotificationManager.remove(notification);
  };

  processQueue = queue => {
    const open = queue.length > 0;

    this.setState({
      messageObject: queue.shift() || {},
      queue,
      open,
    });
  };

  handleExited = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const { messageObject } = this.state;

    this.handleRequestHide(messageObject);
  };

  render() {
    const { messageObject } = this.state;

    return (
      <Snackbar
        anchorOrigin={messageObject.anchorOrigin}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleExited}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <NoticeSnackbarContent
          onClose={this.handleExited}
          variant={messageObject.type}
          message={messageObject.message}
        />
      </Snackbar>
    );
  }
}

export default NotificationContainer;
