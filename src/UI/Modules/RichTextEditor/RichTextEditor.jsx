import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import './RichTextEditor.css';
import { Box } from '@mui/material';
import { convertToHTML } from 'draft-convert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faCode,
  faItalic,
  faList,
  faListOl,
  faQuoteLeft,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

const StyleButton = ({ active, label, onToggle, style }) => {
  const onToggleHandler = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} size='small' onMouseDown={onToggleHandler}>
      {label}
    </span>
  );
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: <FontAwesomeIcon icon={faQuoteLeft} />, style: 'blockquote' },
  { label: <FontAwesomeIcon icon={faList} />, style: 'unordered-list-item' },
  { label: <FontAwesomeIcon icon={faListOl} />, style: 'ordered-list-item' },
  { label: <FontAwesomeIcon icon={faCode} />, style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: <FontAwesomeIcon icon={faBold} />, style: 'BOLD' },
  { label: <FontAwesomeIcon icon={faItalic} />, style: 'ITALIC' },
  { label: <FontAwesomeIcon icon={faUnderline} />, style: 'UNDERLINE' },
  { label: 'monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const RichTextEditor = ({ content, onWatch }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const handleChange = (editorState) => setEditorState(editorState);

  const handleFocus = () => editorRef.current.focus();

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        handleChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  useEffect(() => {
    onWatch(convertToHTML(editorState.getCurrentContent()));
  }, [editorState]);

  useEffect(() => {
    // problem here
    if (content) {
      const blocksFromHTML = convertFromHTML(content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      // do not need to care two line of code

      // const newState = EditorState.createEmpty();
      // const currentState = EditorState.createWithContent(state);

      setEditorState(EditorState.createWithContent(state));
    }
  }, [content]);

  return (
    <Box className='RichEditor-root'>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <Box className={className} onClick={handleFocus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          placeholder="Write your project's description..."
          ref={editorRef}
          spellCheck={true}
        />
      </Box>
    </Box>
  );
};

export default RichTextEditor;
