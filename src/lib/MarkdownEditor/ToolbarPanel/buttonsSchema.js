import React from 'react'
import Bold from '@material-ui/icons/FormatBold'
import Italic from '@material-ui/icons/FormatItalic'
import Size from '@material-ui/icons/FormatSize'
import BulletsList from '@material-ui/icons/FormatListBulleted'
import NumbersList from '@material-ui/icons/FormatListNumbered'
import Quote from '@material-ui/icons/FormatQuote'
import Code from '@material-ui/icons/Code'
import ImageIcon from '@material-ui/icons/Image'
//import LinkIcon from '@material-ui/svg-icons/editor/insert-link'
import LinkIcon from '@material-ui/icons/Link'
//import NavigationExpandMoreIcon from '@material-ui/svg-icons/navigation/expand-more'
import NavigationExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { blueGrey } from '@material-ui/core/colors'

import {
  getUrlStyleIfActive,
  getStyleIfActive,
  isActiveToken,
  isNotUrlBorder,
  handleHeading,
  setBold,
  removeBold,
  setItalic,
  removeItalic,
  setUl,
  removeUl,
  setOl,
  removeOl,
  setH1,
  removeH1,
  setH2,
  removeH2,
  setH3,
  removeH3,
  setCode,
  removeCode,
  setQuote,
  removeQuote
} from '../formatting'
import FlexWrapper from './FlexWrapper'

const getSchema = (cm, tokens) => {
  const getUrlStyle = getUrlStyleIfActive(cm)
  const getActiveStyle = getStyleIfActive(tokens)
  const formatBold = setBold(cm)
  const cancelBold = removeBold(cm)
  const formatItalic = setItalic(cm)
  const cancelItalic = removeItalic(cm)
  const formatUl = setUl(cm)
  const cancelUl = removeUl(cm)
  const formatOl = setOl(cm)
  const cancelOl = removeOl(cm)
  const formatCode = setCode(cm)
  const cancelCode = removeCode(cm)
  const formatQuote = setQuote(cm)
  const cancelQuote = removeQuote(cm)
  const handleH1 = isActiveToken('header-1', tokens, 1) ? removeH1(cm) : setH1(cm)
  const handleH2 = isActiveToken('header-2', tokens, 1) ? removeH2(cm) : setH2(cm)
  const handleH3 = isActiveToken('header-3', tokens, 1) ? removeH3(cm) : setH3(cm)

  return [
    [
      {
        style: {
          marginLeft: 24,
          height: 'auto',
          padding: 6,
          ...getActiveStyle('header')
        },
        isDropDown: true,
        onItemTouchTap: handleHeading([handleH1, handleH2, handleH3]),
        options: [
          {
            primaryText: 'Heading 1',
            style: { fontSize: 12 }
          },
          {
            primaryText: 'Heading 2',
            style: { fontSize: 14 }
          },
          {
            primaryText: 'Heading 3',
            style: { fontSize: 16 }
          }
        ],
        icon: (
          <FlexWrapper>
            <Size />
            <NavigationExpandMoreIcon />
          </FlexWrapper>
        ),
        tooltipText: "H标题",
      },
      {
        style: { ...getActiveStyle('strong') },
        icon: <Bold />,
        onClick: isActiveToken('strong', tokens) ? cancelBold : formatBold,
        tooltipText: "加粗",
      },
      {
        style: getActiveStyle('em'),
        icon: <Italic />,
        onClick: isActiveToken('em', tokens) ? cancelItalic : formatItalic,
        tooltipText: "斜边",
      }
    ],
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('ul') },
        icon: <BulletsList/>,
        onClick: isActiveToken('ul', tokens) ? cancelUl : formatUl,
        tooltipText: "无序列表",
      },
      {
        style: getActiveStyle('ol'),
        icon: <NumbersList />,
        onClick: isActiveToken('ol', tokens) ? cancelOl : formatOl,
        tooltipText: "数字列表",
      }
    ],
    [
      {
        style: { marginLeft: 24, ...getActiveStyle('comment') },
        icon: <Code />,
        onClick: isActiveToken('comment', tokens) ? cancelCode : formatCode,
        tooltipText: "插入代码",
      },
      {
        style: { ...getActiveStyle('quote') },
        icon: <Quote />,
        onClick: isActiveToken('quote', tokens) ? cancelQuote : formatQuote,
        tooltipText: "段落引用",
      }
    ],
    [
      {
        style: {
          marginLeft: 24,
          ...(isActiveToken('url', tokens, 1) && isNotUrlBorder(cm.codeMirror) ? getUrlStyle('link') : {})
        },
        icon: <LinkIcon/>,
        openDialog: true,
        tooltipText: "HTTP链接",
      },
      {
        style: {
          ...(isActiveToken('url', tokens, 1) && isNotUrlBorder(cm.codeMirror) ? getUrlStyle('image') : {})
        },
        icon: <ImageIcon/>,
        openDialog: true,
        isImageDialog: true,
        tooltipText: "插入图片",
      }
    ]
  ]
}

export default getSchema
