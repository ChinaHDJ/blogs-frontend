import React from 'react'
import { ToolbarSeparator } from '@material-ui/core/Toolbar'
import Button from './Button'
import DropDown from './DropDown'

const ToolbarSection = ({ items }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {
      items.map((item, key) => (
        item.isDropDown
          ? <DropDown key={key} {...item} />
          : <Button key={key} {...item} />
      ))
    }
    <ToolbarSeparator />
  </div>
)

export default ToolbarSection
