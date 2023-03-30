import { Editor } from "@tiptap/react";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { EditorSelectionRange } from "types";

export type AiModalMode = "make-longer" | "summerize" | "fix-grammar";

export const AiModalContext = React.createContext<{
  selectionRange: EditorSelectionRange;
  setSelectionRange: Dispatch<SetStateAction<EditorSelectionRange>>;
  selection: string | null;
  setSelection: Dispatch<SetStateAction<string | null>>;
  mode: AiModalMode | null;
  setMode: Dispatch<SetStateAction<AiModalMode | null>>;
  suggestion: string | null;
  setSuggestion: Dispatch<SetStateAction<string | null>>;
  editor: Editor | null;
  setEditor: Dispatch<SetStateAction<Editor | null>>;
}>({
  selectionRange: { from: 0, to: 0 },
  setSelectionRange: () => undefined,
  selection: null,
  setSelection: () => undefined,
  mode: null,
  setMode: () => undefined,
  suggestion: null,
  setSuggestion: () => undefined,
  editor: null,
  setEditor: () => undefined,
});

export const AiModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectionRange, setSelectionRange] = useState<{
    from: number;
    to: number;
  }>({
    from: 0,
    to: 0,
  });
  const [selection, setSelection] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [mode, setMode] = useState<AiModalMode | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <AiModalContext.Provider
      value={{
        selection,
        setSelection,
        selectionRange,
        setSelectionRange,
        mode,
        setMode,
        suggestion,
        setSuggestion,
        editor,
        setEditor,
      }}
    >
      {children}
    </AiModalContext.Provider>
  );
};

export const useAiModalContext = () => {
  return useContext(AiModalContext);
};
