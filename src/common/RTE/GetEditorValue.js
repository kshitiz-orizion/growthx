import React,{ useEffect } from "react";
import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


export default function GetEditorStatePlugin() {
  const [editor] = useLexicalComposerContext();
  return editor.getEditorState().toJSON();
}