import React from "react";
import store from "../../store/index";
import styles from "./style.module.css";

const Analysis = () => {
    const fileAnalysed = store.editor.analysis.hook();

    const errorCount = fileAnalysed?.errorCount;
    const fatalErrorCount = fileAnalysed?.fatalErrorCount;
    const warningCount = fileAnalysed?.warningCount;
    const messages = fileAnalysed?.messages;
    
    return (
        <div className={styles["analysisComponent"]}>
        <div style={{ fontSize: "18px"}}>Analysiss</div>
        <hr style={{borderTop: "1px solid red"}}/>
        <div>Total: <span style={{color: "red"}}>errors</span>: {errorCount + fatalErrorCount} | <span style={{color: "yellow"}}>warnings</span>: {warningCount}</div><br/>
        <div>
            {errorCount !== 0 && errorCount !== null && messages?.map((m, index) => (
                <div>
               {m.severity === 2 && <div className={styles["errorMessage"]}>Error {index+1}: {m.message}
                <div className={styles["coordonates"]}>L : {m.line}, C : {m.column},</div><br/>
                </div> }
                </div>
            ))}
            {fatalErrorCount !== 0 && fatalErrorCount !== null && messages?.map((m, index) => (
                <div>
               {<div className={styles["errorMessage"]}>Error {index+1}: {m.message}
                <div className={styles["coordonates"]}>L : {m.line}, C : {m.column},</div><br/>
                </div> }
                </div>
            ))}
            {warningCount !== 0 && warningCount !== null && messages?.map((m, index) => (
                <div>
                {m.severity === 1 && <div className={styles["warningMessage"]}>Warning {index+1}: {m.message}
                <div className={styles["coordonates"]}>L : {m.line}, C : {m.column}</div><br/>
                </div> }
                </div>
            ))}
        </div>
      </div>
    );
}

export default Analysis;