import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
const text = `Cool, we can have all sorts of Emojis here. 🙌
🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;

class EditPage extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <EmojiSuggestions />
        </div>
        <div>
          <EmojiSelect />
        </div>
      </div>
    );
  }
}

export default EditPage;
