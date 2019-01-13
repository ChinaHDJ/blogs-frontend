import React, {Fragment} from 'react';
import Button from "@material-ui/core/Button/Button";
import { Icon } from "antd";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

class LoadButton extends React.Component{

  renderLoading = () => {
    const { loading, loadingSize } = this.props;

    if (loading){
      return (
        <Fragment>
          <CircularProgress size={loadingSize || '15px'} />
          &nbsp;&nbsp;&nbsp;
        </Fragment>
      )
    }
  };

  render() {
    const { loading, children, ...other } = this.props;

    return (
      <Button
        variant="contained"
        disabled={loading}
        {...other}
      >
        {this.renderLoading()}
        {children}
      </Button>
    )
  }
}

export default LoadButton;
