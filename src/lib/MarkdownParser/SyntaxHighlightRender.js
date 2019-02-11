import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import CodeStyleList from '@/lib/utils/CodeStyleList';

class SyntaxHighlightRender extends React.Component{
  render() {
    const { language, value, codeStyleKey } = this.props;

    if (language === undefined || language === null){
      return null;
    }

    const style = require(`react-syntax-highlighter/dist/styles/hljs/${CodeStyleList[codeStyleKey].label}`);

    return (
      <div>
        <SyntaxHighlighter language={language} style={style.default}>{value || ""}</SyntaxHighlighter>
      </div>
    )
  }
}

export default SyntaxHighlightRender;
