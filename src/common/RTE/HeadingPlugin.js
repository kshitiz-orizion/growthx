import { ParagraphNode, HeadingNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposer';
import { useEffect } from 'react';

function StartWithHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerNodeTransform(ParagraphNode, (node) => {
      return node.replace(HeadingNode.create({ level: 1 }));
    });
  }, [editor]);

  return null;
}

export default StartWithHeadingPlugin