import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import getButtonsSchema from './buttonsSchema'
import DropDown from "./DropDown";
import Button from "./Button";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Selecta from 'react-select'
import CodeStyleList from '@/lib/utils/CodeStyleList';
import Card from "@material-ui/core/Card/Card";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import ImageButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Eye from "@material-ui/icons/RemoveRedEye"
import { Icon } from "antd";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import EmojiPicker from 'emoji-picker-react';

const ToolbarPanel = ({ cm, tokens, onCodeStyleSelectChange, selectValue, isMobile, onToggleEye, eyeType }) => (
  <AppBar position={'relative'} color={'inherit'} style={{overflowY: 'visible'}}>
    <Toolbar style={{overflowX: 'auto'}} variant="dense" disableGutters>
      {
        getButtonsSchema(cm, tokens).map((section, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {section.map((item, key) => (item.isDropDown ? <DropDown key={`${i} - ${key}`} {...item} /> : <Button key={`${i} - ${key}`} {...item} />))}
          </div>
        ))
      }

      {isMobile && (
        <IconButton onClick={onToggleEye}>
          <Icon type={ eyeType ? 'eye' : 'eye-invisible' } />
        </IconButton>
      )}

      <Tooltip title={"更换代码语法高亮样式"}>
        <Select
          value={selectValue || 0}
          inputProps={{
            name: 'code-style-change',
            id: 'code-style-change',
          }}
          onChange={onCodeStyleSelectChange}
        >
          {_.map(CodeStyleList, (codeStyle, key) => <MenuItem key={key} value={key}>{codeStyle.label}</MenuItem>)}
        </Select>
      </Tooltip>
    </Toolbar>
  </AppBar>
)

export default ToolbarPanel
