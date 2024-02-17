import "./RTE/style.css";
import ExampleTheme from "./RTE/Theme";
import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./RTE/TreeViewPlugin";
import ToolbarPlugin from "./RTE/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./RTE/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./RTE/CodeHighlightPlugin";
import AutoLinkPlugin from "./RTE/AutoLinkPlugin";

import { ParagraphNode } from "lexical";
import FloatingTextFormatToolbarPlugin from "./RTE/FloatingToolBar";
import StartWithHeadingPlugin from "./RTE/HeadingPlugin";
import { CustomParagraphNode } from "./RTE/CustomParagraphNode";

function Placeholder({placeholder, placeholderClass}) {
  const text = placeholder || "Enter some rich text..."
  return <div className={`${placeholderClass} editor-placeholder`}>{text}</div>;
}

const editorConfig = {
  // The editor theme 
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
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
    ParagraphNode,
    CustomParagraphNode,

  ],
};


export default function Editor(props) {
  
  const classForEditor = props.className || ''
  const placeholder = props.placeholder
  const showToolBar = props.showToolBar
  const placeholderClass = props.placeholderClass
  const editorInnerClassName= props.editorInnerClassName
  const editorContainerClassName = props.editorContainerClassName
  const id = props.id
  const textType = props.textType
  const type = props.type
  const onlyLinks = props.onlyLinks


  const config = {editorConfig}

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={`${editorContainerClassName} editor-container`}>
        {/* {!!showToolBar && <ToolbarPlugin />} */}
        <div className={`${editorInnerClassName} editor-inner`}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={`${classForEditor} editor-input`} id={id}/>}
            placeholder={<Placeholder placeholder={placeholder} placeholderClass={placeholderClass}/>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin/>
          {/* <StartWithHeadingPlugin/> */}
          <AutoFocusPlugin />
          <FloatingTextFormatToolbarPlugin textType={textType} type={type}/>
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin onlyLinks={onlyLinks}/>
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
