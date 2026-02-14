import React, { useEffect, useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HTMLSetting, RichTextContainer } from "./RichText.styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box } from "./Box";
import Placeholder from "@tiptap/extension-placeholder";

function RichText({ content, onChange, placeholder, selectedSite }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Type something...",
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: "rich-text-editor",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, selectedSite]);

  const controls = React.useMemo(
    () => [
      {
        text: "text-bold-square",
        name: "bold",
        run: () => editor?.chain().focus().toggleBold().run(),
        isActive: () => editor?.isActive("bold"),
      },
      {
        text: "text-italic-square",
        name: "italic",
        run: () => editor?.chain().focus().toggleItalic().run(),
        isActive: () => editor?.isActive("italic"),
      },
      // Add more controls here as needed
    ],
    [editor]
  );

  if (!editor) {
    return <p>Loading...</p>;
  }

  return (
    <RichTextContainer>
      <Box $justifyContent="flex-start" $spacingX="5px" $spacingY="5px">
        {controls.map((control) => (
          <Icon
            key={control.name}
            icon={`solar:${control?.text}-${
              editor?.isActive(control.name) ? "bold" : "outline"
            }`}
            fontSize={20}
            onClick={control.run}
          />
        ))}
      </Box>
      <EditorContent editor={editor} />
    </RichTextContainer>
  );
}

export default RichText;
