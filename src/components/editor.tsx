import React, { useEffect, useRef } from "react";

/**
 * add 10 static scripts to the store,
 * display them in the files column,
 * on click, show the file content in the editor,
 * and on each value change lint the content,
 * and show the analysis in the Analysis column
 * 
 * Then create the simplest node local server,
 * install eslint,
 * then for each change in the editor post the content,
 * parse with eslint on server,
 * and return the array of messages,
 * and display them into the analysis column
 * 
 * Code Quality
 * Spend 4 hours of research to discover what already exists
 * Interview cu Radu Gaspar
 * Propose a code quality baseline
 * 
 */


const Monaco: React.FC<{
  shouldFillAllMinus?: number;
  onMount?: (editor: monaco.editor.ICodeEditor) => void;
  onValueChange?: (value: string) => void;
  value: string
}> = ({ shouldFillAllMinus, onMount, onValueChange, value }) => {
  const editorElement = useRef<HTMLDivElement>(null!);
  const editorInstance = useRef<monaco.editor.ICodeEditor>(null!);
  const onResize = () => {
    if (!editorInstance.current) {
      return;
    }

    editorInstance.current?.layout();
    if (shouldFillAllMinus && editorInstance.current) {
      editorElement.current.style.width =
        window.innerWidth - shouldFillAllMinus + "px";
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    const init = () => {
      editorInstance.current = monaco.editor.create(editorElement.current, {
        value: "loading...",
        language: "javascript",
      });

      editorInstance.current.onDidChangeModelContent(() => {
        // @ts-ignore
        onValueChange(editorInstance.current.getValue() || "");
      });

      // @ts-ignore
      onMount(editorInstance.current);
    };

    require.config({
      paths: { vs: "https://unpkg.com/monaco-editor@0.31.1/min/vs" },
    });

    require(["vs/editor/editor.main"], init);

    return () => {
      window.removeEventListener("resize", onResize);
      editorInstance.current.dispose();
    };
  }, []);

  useEffect(() => {}, []);
  return <div style={{ height: "100%" }} ref={editorElement} />;
};

export default Monaco
