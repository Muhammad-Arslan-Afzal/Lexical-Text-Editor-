import { Box } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { css } from "@emotion/css";
import { ToolbarPlugin } from "../plugins";
import { EditorThemeClasses } from "lexical";
import { ListNode, ListItemNode } from "@lexical/list";
import CustomOnChangePlugin from "../plugins/CustomOnChangePlugin";

const theme: EditorThemeClasses = {
  text: {
    bold: css({ fontWeight: "bold" }),
    underline: css({ textDecoration: "underline" }),
    strikethrough: css({ textDecoration: "line-through" }),
    underlineStrikethrough: css({ textDecoration: "underline line-through" }),
    italic: css({ fontStyle: "italic" }),
    code: css({
      color: "black",
      padding: 2,
      background: "#eee",
      border: "1px solid #ccc",
    }),
  },
  list: {
    ul: css({
      listStylePosition: "inside", // ensures bullets/numbers are inside the border
      margin: 0,
      paddingLeft: "20px", // adjusts the indentation of list items
    }),
    ol: css({
      listStylePosition: "inside", // for ordered lists
      margin: 0,
      paddingLeft: "20px",
    }),
    listitem: css({
      marginBottom: "8px", // space between list items
    }),
  },
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ value, onChange, placeholder, name }) {
    const initialConfig = useMemo(
      () => ({
        namespace: name,
        theme,
        onError: () => {},
        nodes: [ListNode, ListItemNode, CodeHighlightNode, CodeNode],
      }),
      [name]
    );

    return (
      <Box>
        <LexicalComposer initialConfig={initialConfig}>
          <ToolbarPlugin />
          <Box pos="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className={css({
                    height: 120,
                    fontSize: 12,
                    padding: 8,
                    overflow: "auto",
                    outline: "none",
                    border: "1px solid black",
                    borderRadius: "4px",
                  })}
                />
              }
              placeholder={
                <Box
                  className={css({
                    position: "absolute",
                    color: "#999",
                    top: 8,
                    left: 10,
                    fontSize: 12,
                  })}
                >
                  {placeholder}
                </Box>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </Box>
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <CustomOnChangePlugin value={value} onChange={onChange} />
        </LexicalComposer>
      </Box>
    );
  }
);
