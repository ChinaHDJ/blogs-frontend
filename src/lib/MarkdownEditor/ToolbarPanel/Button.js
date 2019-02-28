import React, { PropTypes } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Plus from '@material-ui/icons/PlusOne';
import {blueGrey} from "@material-ui/core/colors";
import ImageIcon from '@material-ui/icons/Image'
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";

const Button = ({ onClick, style, icon, openDialog, isImageDialog, tooltipText }, { toggleDialog }) => (
  <Tooltip title={tooltipText}>
    <IconButton
      aria-label={tooltipText}
      onClick={console.log}
      style={{ ...style, minWidth: '36px' }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

export default Button
