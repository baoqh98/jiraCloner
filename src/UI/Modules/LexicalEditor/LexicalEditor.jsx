import ExampleTheme from './themes/ExampleTheme';
import {
  $getRoot,
  $getSelection,
  $setSelection,
  CLEAR_EDITOR_COMMAND,
} from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';

import './LexicalEditor.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';

function Placeholder() {
  return <div className='editor-placeholder'>Project description..</div>;
}

function onError(error) {
  console.error(error);
}

const editorConfig = {
  // The editor theme
  editorState: null,
  theme: ExampleTheme,
  editable: true,

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

function MyCustomAutoFocusPlugin({ editorState, onWatch, content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    if (editorState) {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onWatch(htmlString);
        return;
      });
    }
  }, [editorState, editor, onWatch]);

  useEffect(() => {
    if (content) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);

      editor.update(() => {
        const selection = $getRoot().select();
        const parser = new DOMParser();
        const dom = parser.parseFromString(content, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);

        // Insert them at a selection.
        selection.insertNodes(nodes);
        return;
      });
    }
  }, [content, editor]);

  return null;
}

export default function LexicalEditor({ onWatch, content }) {
  const [editorState, setEditorState] = useState(null);

  const onChangeHandler = (editorState) => {
    editorState.read(() => {
      setEditorState(editorState);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
          />
          <OnChangePlugin ignoreInitialChange onChange={onChangeHandler} />
          <HistoryPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ClearEditorPlugin />
          <MyCustomAutoFocusPlugin
            editorState={editorState}
            onWatch={onWatch}
            content={content}
          />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
