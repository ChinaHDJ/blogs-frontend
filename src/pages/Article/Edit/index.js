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
