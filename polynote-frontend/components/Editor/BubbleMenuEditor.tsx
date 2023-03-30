import { Editor as EditorProp, BubbleMenu } from "@tiptap/react";
import { ModalController } from "hooks/useModal";
import { useNotify } from "hooks/useNotify";
import { useCallback } from "react";
import { BsStars } from "react-icons/bs";
import { useAiModalContext } from "utils/AiModalContext";
import { clsnm } from "utils/clsnm";

type Props = {
  editor: EditorProp;
  aiModal: ModalController;
};

export const BubbleMenuEditor = ({ editor, aiModal }: Props) => {
  const notify = useNotify();
  const aiModalContext = useAiModalContext();

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const setHighlight = useCallback(() => {
    if (editor.isActive("textStyle", { color: "#FFBF00" })) {
      editor.chain().focus().setColor("none").run();
      return;
    }

    editor.chain().focus().setColor("#FFBF00").run();
  }, [editor]);

  const selectText = () => {
    const { from, to } = editor.state.selection;
    if (from == null || to == null || to == 0) {
      notify.info("Invalid selection");
      return;
    }
    aiModalContext.setSelectionRange({
      from,
      to,
    });

    const selection = editor.state.doc.textBetween(from, to);
    aiModalContext.setSelection(selection.trim());
    aiModal.open();
  };

  return (
    <>
      <BubbleMenu
        className={clsnm("bubble-menu bg-DARK_PURPLE")}
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <div className="flex flex-col items-center">
          <div className="flex space-x-1">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
          </div>
          <div className="flex mt-2 space-x-1">
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              Code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              Blockquote
            </button>
            <button
              onClick={setLink}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              Link
            </button>
            {editor?.can().chain().focus().setColor("#FFBF00").run() && (
              <button
                onClick={setHighlight}
                className={
                  editor.isActive("textStyle", { color: "#FFBF00" })
                    ? "is-active"
                    : ""
                }
              >
                Higlight
              </button>
            )}
          </div>
          <div className="flex mt-2 space-x-1">
            <button
              className="flex space-x-1 items-center"
              onClick={selectText}
            >
              <span>PoynoteAI</span> <BsStars />
            </button>
          </div>
        </div>
      </BubbleMenu>
    </>
  );
};
