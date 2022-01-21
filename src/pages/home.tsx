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
  const selectedFile = store.files.selectedFile.hook();

  const handleOnEditorMount = (editor: monaco.editor.IEditor) => {
    const files = store.files.static;
    const firstFile = Object.keys(files)[0];
    const firstFileContent = files[firstFile];

    monaco.current = editor
    // @ts-ignore
    monaco.current && monaco.current.getModel().setValue(firstFileContent)
  };

  const handleOnFileChange = (editor: monaco.editor.IEditor) => {
    monaco.current = editor
    // @ts-ignore
    monaco.current && monaco.current.getModel().setValue(value)
  };

  useEffect(() => {
    worker.current.postMessage({
      value,
    });
  }, [value]);

  useEffect(() => {
    const files = store.files.static;
    const firstFile = Object.keys(files)[0];
    store.editor.value.next(files[firstFile] || '');
    store.files.selectedFile.next(firstFile);
  }, [])

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
          onFileChange={handleOnFileChange}
          shouldFillAllMinus={500}
          onValueChange={(value) => {
            console.log('editor value:',value)
            store.editor.value.next(value);
            store.editor.checkCode(value);
          }}
          value={value}
          file={selectedFile}
        />
      </div>
      <Analysis />
    </div>
  );
};

export default Home;
