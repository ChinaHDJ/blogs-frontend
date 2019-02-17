// import React, { Component } from 'react';
// import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createMentionPlugin from 'draft-js-mention-plugin';
// import 'draft-js-emoji-plugin/lib/plugin.css'
// import'draft-js-mention-plugin/lib/plugin.css'
// import editorStyles from './editorStyles.css';
// import Chip from "@material-ui/core/Chip/Chip";
// import Avatar from "@material-ui/core/Avatar/Avatar";
// import MarkdownParser from "../../../lib/MarkdownParser";
// import Tabs from "@material-ui/core/Tabs/Tabs";
// import Tab from "@material-ui/core/Tab/Tab";
// import AppBar from "@material-ui/core/AppBar/AppBar";
// import Divider from "@material-ui/core/es/Divider/Divider";
// import Card from "@material-ui/core/Card";
//
// const emojiPlugin = createEmojiPlugin();
// const { EmojiSuggestions } = emojiPlugin;
//
// const text = `Cool, we can have all sorts of Emojis here. 🙌
// 🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;
//
// class EditPage extends Component {
//
//   state = {
//     editorState: createEditorStateWithText(text),
//     suggestions: [],
//   };
//
//   constructor(props) {
//     super(props)
//
//     this.mentionPlugin = createMentionPlugin({
// /*      mentionComponent: ({ mention }) => (
//         <Chip
//           avatar={<Avatar alt={mention.name} src={mention.avatar} />}
//           label={mention.name}
//         />
//       ),*/
//     })
//   }
//
//   onChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };
//
//   focus = () => {
//     this.editor.focus();
//   };
//
//   onSearchChange = () => {
//     this.setState({
//       suggestions: [{
//         name: 'MatthewRussell',
//         link: 'https://twitter.com/mrussell247',
//         avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
//       }]
//     })
//   }
//
//   render() {
//     const { MentionSuggestions } = this.mentionPlugin;
//     const plugins = [this.mentionPlugin, emojiPlugin];
//
//     return (
//       <div>
//         <div className={editorStyles.editor} onClick={this.focus}>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={(element) => { this.editor = element; }}
//           />
//           <MentionSuggestions
//             onSearchChange={this.onSearchChange}
//             suggestions={this.state.suggestions}
//           />
//           <EmojiSuggestions />
//         </div>
//
//         <div>
//           <MarkdownParser source={
//             "# 321"
//           } currCodeStyleKey={0} />
//         </div>
//       </div>
//     );
//   }
// }

import React from 'react';
import MarkdownEditor from '@/lib/MarkdownEditor';

// Output CSS as string.

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.

// 文章编辑Markdown
class EditPage extends React.Component{

  render() {
    return (
      <div>
        <MarkdownEditor/>
      </div>
    );
  }
}


export default EditPage;
