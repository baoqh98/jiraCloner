import ExampleTheme from './themes/ExampleTheme';
import { $getRoot, CLEAR_EDITOR_COMMAND } from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

import './LexicalEditor.css';
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function onError(error) {
  console.error(error);
}

const editorConfig = {
  // The editor theme
  editorState: null,
  theme: ExampleTheme,
  editable: false,

  // Handling of errors during update
  onError,
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function MyCustomAutoFocusPlugin({ editorState, onWatch, payload }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    if (payload) {
      editor.update(() => {
        const selection = $getRoot().select();
        const parser = new DOMParser();
        const dom = parser.parseFromString(payload, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        // Insert them at a selection.
        selection.insertNodes(nodes);
        return;
      });
    }
  }, [payload, editor]);

  return null;
}

export default function LexicalEditor({ onWatch, payload }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container-readonly'>
        <div className='editor-inner-readonly'>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className='editor-input-readonly' />
            }
          />
          <MyCustomAutoFocusPlugin payload={payload} />
        </div>
      </div>
    </LexicalComposer>
  );
}
