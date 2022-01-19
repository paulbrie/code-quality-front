import React from "react";
import store from "../../store/index";
import styles from "./style.module.css";

const Files = () => {
    const allFiles = store.files.static;
    const selectedFile = store.files.selectedFile.hook();
    console.log("Selected", selectedFile);
    
    return (
      <>
       Files
        <div style={{
          marginTop: "15px"
        }}>
          {
             Object.keys(allFiles).map((file) => {
                 return (
                     <div 
                     className={`${styles["single-file"]}
                      ${selectedFile === file && styles["active-file"]}
                     `}
                     onClick={() => {
                       store.files.selectedFile.next(file)
                       store.editor.value.next(allFiles[file])
                     }}
                     >
                       {file}
                     </div>
                 )
             })
          }
        </div>
        </>
    )
}

export default Files;