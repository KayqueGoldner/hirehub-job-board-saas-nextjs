import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Textalign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";

import { MenuBar } from "./menu-bar";
import { ControllerRenderProps } from "react-hook-form";

interface JobDescriptionEditorProps {
  field: ControllerRenderProps;
}

export const JobDescriptionEditor = ({ field }: JobDescriptionEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Textalign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 max-w-none focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: JSON.parse(field.value || "{}"),
  });

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
