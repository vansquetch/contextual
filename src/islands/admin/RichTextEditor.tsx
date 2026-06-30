import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import DOMPurify from "dompurify";

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),

      Underline,

      Link.configure({
        openOnClick: false,
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[180px] rounded-lg border border-gray-300 p-4 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(DOMPurify.sanitize(editor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      <Toolbar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
}

import type { Editor } from "@tiptap/react";

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2">
      <ToolbarButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <u>U</u>
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Lista
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. Lista
      </ToolbarButton>
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick(): void;
}

function ToolbarButton({ children, active, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded px-3 py-1 text-sm transition

        ${active ? "bg-primary-500 text-white" : "hover:bg-gray-200"}
      `}
    >
      {children}
    </button>
  );
}
