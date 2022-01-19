import React, { useEffect, useRef } from "react";
import Editor from "../components/editor";
import Analysis from "../components/Analysis";
import Files from "../components/Files/index";
import store from "../store/index";
import createWorker from "../lib/createWorker";

const Home = () => {
  const monaco = useRef<monaco.editor.IEditor>(null!);
  const worker = useRef<Worker>(
    createWorker(function (e: any) {
      console.log("Received input: ", e);
      postMessage("Response back to main thread");
    })
  );

  const value = store.editor.value.hook();
  const handleOnEditorMount = (editor: monaco.editor.IEditor) => {
    monaco.current = editor
    // @ts-ignore
    monaco.current.getModel().setValue(value)
  };

  useEffect(() => {
    console.log('val', value)
    worker.current.postMessage({
      value,
    });
  }, [value]);

  useEffect(() => {
    return () => worker.current.terminate();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px auto 300px",
        height: "100vh",
      }}
    >
      <div style={{ backgroundColor: "#222", color: "#fff", padding: "16px" }}>
        <Files />
      </div>
      <div>
        <Editor
          onMount={handleOnEditorMount}
          shouldFillAllMinus={500}
          onValueChange={(value) => {
            console.log('editor value:',value)
            store.editor.value.next(value);
            store.editor.checkCode(value);
          }}
          value={value}
        />
      </div>
      <Analysis />
    </div>
  );
};

export default Home;
