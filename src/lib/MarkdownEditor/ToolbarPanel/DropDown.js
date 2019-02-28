import React, {Fragment} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import Tooltip from "@material-ui/core/Tooltip";

/*const DropDown = ({ icon, style, options, onItemTouchTap }) => (
  <Fragment>
    <IconButton style={style}>{ icon }</IconButton>
    <Menu
      anchorEl={anchorEl}
    >
      {options.map((option, i) => <MenuItem key={i} {...option} />)}
    </Menu>
  </Fragment>
);*/

class DropDown extends React.Component{
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { icon, style, options, onItemTouchTap, tooltipText } = this.props;

    return (
      <Fragment>
        <Tooltip title={tooltipText}>
          <IconButton
            aria-label={tooltipText}
            style={style}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            { icon }
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, i) => (
            <MenuItem key={i} style={option.style} onClick={() => {
              this.handleClose();
            }}>
              {option.primaryText}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }

}

export default DropDown
