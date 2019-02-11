import SyntaxHighlightRender from "./SyntaxHighlightRender";
import BlockQuoteRender from "./BlockQuoteRender";
import ReactMarkdown from "react-markdown";
import React from "react";
import ImageRender from "./ImageRender";

class MarkdownParser extends React.Component {

  render() {
    const { source, currCodeStyleKey } = this.props;

    return (
      <ReactMarkdown source={source} renderers={{
        code: props => <SyntaxHighlightRender {...props} codeStyleKey={currCodeStyleKey} />,
        image: ImageRender,
        blockquote: BlockQuoteRender,
      }} />
    );
  }
}

export default MarkdownParser;
