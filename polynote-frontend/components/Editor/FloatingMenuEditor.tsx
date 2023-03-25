import { Editor as EditorProp, FloatingMenu } from "@tiptap/react";
import { MB } from "consts/numbers";
import { allowedFileTypes } from "consts/upload";
import { useNotify } from "hooks/useNotify";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUploadMutation } from "restapi/queries/useUploadMutation";
import { Spinner } from "ui";
import { clsnm } from "utils/clsnm";

type Props = {
  editor: EditorProp;
};

export const FloatingMenuEditor = ({ editor }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile == null) return;
  }, [selectedFile]);

  const imageInput = useRef<HTMLInputElement | null>(null);
  const notify = useNotify();

  const uploadMutation = useUploadMutation({
    onError: () => {
      setSelectedFile(null);
    },
    onSuccess: (res) => {
      const url = res.data.url;
      editor.chain().focus().setImage({ src: url, alt: "Loading..." }).run();
    },
  });

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null) {
      setSelectedFile(null);
      return;
    }

    const fileSizeInMB = file.size / MB;

    if (fileSizeInMB > 2) {
      setSelectedFile(null);
      notify.error("Please upload a file smaller than 2MB");
      return;
    }

    const extension = file.name.split(".").pop();

    if (extension == null || !allowedFileTypes.includes(extension)) {
      notify.error("You can only upload an image");
      return;
    }

    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile == null) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    uploadMutation.mutate(formData);
  }, [selectedFile]);

  return (
    <FloatingMenu
      className={clsnm("floating-menu bg-DARK_PURPLE")}
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="flex flex-col p-1 items-center">
        <div className="flex space-x-3">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </button>
        </div>
        <div className="flex mt-1 space-x-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered List
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Line
          </button>
        </div>
        <div className="flex mt-1 space-x-1">
          <input
            accept="image/*"
            value={""}
            type="file"
            ref={imageInput}
            className="hidden"
            onChange={onFileChange}
          />
          <button
            disabled={uploadMutation.isLoading}
            onClick={() => {
              if (!imageInput.current) return;
              imageInput.current.click();
            }}
          >
            {uploadMutation.isLoading ? (
              <span className="my-[4px]">
                <Spinner />
              </span>
            ) : (
              "Image"
            )}
          </button>
        </div>
      </div>
    </FloatingMenu>
  );
};
