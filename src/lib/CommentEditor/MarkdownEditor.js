import React from 'react'
import Codemirror from 'react-codemirror'
import ToolbarPanel from './ToolbarPanel'
import { getCurrentFormat } from './formatting'
import Grid from "@material-ui/core/Grid/Grid";
import Card from "../component/Card/Card";
import withStyles from "@material-ui/core/es/styles/withStyles";
import MarkdownParser from "../MarkdownParser";
import { NotificationManager } from '@/lib/SnackbarApi'
import Media from 'react-media'
import CodeStyleList from '@/lib/utils/CodeStyleList'
import Paper from "@material-ui/core/es/Paper/Paper";
import ChipInput from 'material-ui-chip-input'
import TextField from "@material-ui/core/TextField/TextField";
import '@/assets/codemirrorOverride.css'
import 'codemirror/lib/codemirror.css'
import Button from "@material-ui/core/Button/Button";
import Divider from "@material-ui/core/es/Divider/Divider";

const styles = () => ({
  markdownCard: {
    height: '100%',
    padding: 30,
    borderRadius: 1,
    overflow: 'auto'
  },
  syntaxHighlighterStyle: {
    lineHeight: 0
  },
  editInfo: {
    height: 150,
    borderRadius: 1,
    padding: 10,
  },
  CodeMirrorHeight: {
    height: '85%',
  }
});

export class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: [],
      code: '',
      isDialogOpen: false,
      isImageDialog: false,
      currCodeStyleKey: 0,
      eyeType: false
    };

    this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount() {
    this.setState({
      cm: this.cm,
      code: this.props.code,
      title: this.props.title
    });

    this.cm.codeMirror.on('cursorActivity', this.updateTokens.bind(this))
  }

  updateTokens() {
    const tokens = getCurrentFormat(this.cm)
    this.setState({ tokens })
  }

  updateCode(newCode) {
    this.setState({code: newCode})
  }

  onToggleEye = () => {
    const { eyeType } = this.state;

    this.setState({eyeType: !eyeType}, () => {
      NotificationManager.info({message: `现在是${this.state.eyeType ? "预览" : "编辑"}模式`})
    });
  };

  onCodeStyleSelectChange = (e) => {
    this.setState({currCodeStyleKey: e.target.value}, () => {
      NotificationManager.success({message: `更改代码高亮主题为 ${CodeStyleList[e.target.value].label}`})
    })
  };

  render() {
    const { classes, isMobile } = this.props;
    const { cm, tokens, title, currCodeStyleKey, eyeType } = this.state;
    const options = {
      lineNumbers: false,
      mode: 'markdown',
      readOnly: false,
    };
    const screenHeight = document.body.clientHeight - 120;

    console.log(document.body.clientHeight)
    return (
      <div>
        <ToolbarPanel
          cm={cm}
          tokens={tokens}
          onCodeStyleSelectChange={this.onCodeStyleSelectChange}
          title={title}
          selectValue={currCodeStyleKey}
          isMobile={isMobile}
          onToggleEye={this.onToggleEye}
          eyeType={eyeType}
        />

        <Grid container spacing={isMobile ? 0 : 16}>
          <Grid style={{display: !isMobile || !this.state.eyeType ? "block" : "none", height: screenHeight - 120}} item sm={6} xs={12}>
            <Paper className={classes.editInfo}>
              <TextField
                id="articleTitle"
                label="文章标题"
                className={classes.textField}
                value={this.state.name}
                margin="normal"
                variant="filled"
                fullWidth
              />
              <ChipInput
                defaultValue={['foo', 'bar']}
                onChange={console.log}
                placeholder={"文章标签"}
                fullWidth
              />
            </Paper>

            <Card style={{height: isMobile ? screenHeight : screenHeight - 205}}>
              <Codemirror
                className={classes.CodeMirrorHeight}
                ref={((ref) => { this.cm = ref })}
                value={this.state.code}
                onChange={this.updateCode}
                options={options}
              />
              <Button style={{margin: 20}} variant="contained" color="primary" className={classes.button}>
                发布文章
              </Button>
            </Card>
          </Grid>

          <Grid style={{display: !isMobile || this.state.eyeType ? "block" : "none", height: screenHeight}} item sm={6} xs={12}>
            <Paper className={classes.markdownCard} style={{height: '100%'}}>
              <h1>文章标题</h1>
              <Divider/>
              <MarkdownParser source={this.state.code} currCodeStyleKey={this.state.currCodeStyleKey} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)((props) => (
  <Media query={{ maxWidth: 599 }}>
    {isMobile => <MarkdownEditor {...props} isMobile={isMobile}/>}
  </Media>
));
