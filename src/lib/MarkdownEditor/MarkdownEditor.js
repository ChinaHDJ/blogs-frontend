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

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css'
import'draft-js-mention-plugin/lib/plugin.css'
import editorStyles from './editorStyles.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const styles = () => ({
  markdownCard: {
    height: 804,
    padding: 30,
    borderRadius: 1,
    overflow: 'auto'
  },
  syntaxHighlighterStyle: {
    lineHeight: 0
  },
  editInfo: {
    height: 170,
    borderRadius: 1,
    padding: 10,
  },
  CodeMirrorHeight: {
    height: '85%',
  }
});

export class MarkdownEditor extends React.Component {

  state = {
    editorState: createEditorStateWithText("markdown_editor"),
    suggestions: [],
    tokens: [],
    code: '',
    isDialogOpen: false,
    isImageDialog: false,
    currCodeStyleKey: 0,
    eyeType: false
  };

  constructor(props) {
    super(props)

    this.mentionPlugin = createMentionPlugin()
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  onSearchChange = () => {
    this.setState({
      suggestions: [{
        name: 'MatthewRussell',
        link: 'https://twitter.com/mrussell247',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
      }]
    })
  };

  componentDidMount() {
    this.setState({
      cm: this.cm,
      code: this.props.code,
      title: this.props.title
    });

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
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin, emojiPlugin];
    const { cm, tokens, title, currCodeStyleKey, eyeType } = this.state;

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
        <Grid container spacing={isMobile ? 0 : 8}>
          <Grid style={{display: !isMobile || !this.state.eyeType ? "block" : "none"}} item sm={6} xs={12}>
            <Paper>
              <Paper className={classes.editInfo}>
                <TextField
                  id="articleTitle"
                  label="文章标题"
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
              <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  plugins={plugins}
                  ref={(element) => { this.editor = element; }}
                />
                <MentionSuggestions
                  onSearchChange={this.onSearchChange}
                  suggestions={this.state.suggestions}
                />
                <EmojiSuggestions />
              </div>

              <Button style={{margin: 10}} variant="contained" color="primary" className={classes.button}>
                发布文章
              </Button>
            </Paper>
          </Grid>

          <Grid style={{display: !isMobile || this.state.eyeType ? "block" : "none"}} item sm={6} xs={12}>
            <Paper className={classes.markdownCard}>
              <h1>文章标题</h1>
              <Divider/>
              <MarkdownParser source={handleData(this.state.editorState.getCurrentContent())} currCodeStyleKey={this.state.currCodeStyleKey} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const handleData = (contentState) => {
  const blocks =  contentState.getBlocksAsArray();

  let data = "";

  blocks.forEach((block) => {
    data += block.getText();
    data += "\n"
  });

  return data;
};

export default withStyles(styles)((props) => (
  <Media query={{ maxWidth: 599 }}>
    {isMobile => <MarkdownEditor {...props} isMobile={isMobile}/>}
  </Media>
));
