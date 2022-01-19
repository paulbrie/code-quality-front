import React from "react";
import store from "../../store/index";
import styles from "./style.module.css";

const Analysis = () => {
     const files = store.files;
     //const 
    //  console.log(files);

     const fileAnalysis = [
    {
        "filePath": "<text>",
        "messages": [
            {
                "ruleId": "no-const-assign",
                "severity": 2,
                "message": "'asd' is constant.",
                "line": 1,
                "column": 19,
                "nodeType": "Identifier",
                "messageId": "const",
                "endLine": 1,
                "endColumn": 22
            }
        ],
        "errorCount": 1,
        "fatalErrorCount": 0,
        "warningCount": 0,
        "fixableErrorCount": 0,
        "fixableWarningCount": 0,
        "source": "const asd = null; asd = 2; console.log(asd)",
        "usedDeprecatedRules": []
    }
];
    // console.log(fileAnalysis);
    const errorCount = fileAnalysis[0].errorCount;
    const warningCount = fileAnalysis[0].warningCount;
    const messages = fileAnalysis[0].messages;
    // console.log(messages);

    return (
        <div className={styles["analysisComponent"]}>
        <div style={{ fontSize: "18px"}}>Analysis</div>
        <hr style={{borderTop: "1px solid red"}}/>
        <div>Total: <span style={{color: "red"}}>errors</span>: {errorCount} | <span style={{color: "yellow"}}>warnings</span>: {warningCount}</div><br/>
        <div>
            {errorCount !== 0 && messages.map((m, index) => (
                <div>
                <div className={styles["errorMessage"]}>Error {index+1}: {m.message}
                <div>Lines: {m.line} - {m.endLine}, Columns: {m.column} - {m.endColumn}, ruleId: {m.ruleId}</div><br/>
                </div> 
                </div>
            ))}
            {warningCount !== 0 && messages.map((m, index) => (
                <div>
                <div className={styles["warningMessage"]}>Warning {index+1}: {m.message}
                <div>Lines: {m.line} - {m.endLine}, Columns: {m.column} - {m.endColumn}</div><br/>
                </div> 
                </div>
            ))}
        </div>
      </div>
    );
}

export default Analysis;