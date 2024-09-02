import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./LibraryContent.css";

const initialHTML3 = `
<!DOCTYPE html>
<html>
<head>
  <title>Library 3</title>
</head>
<body>
  <h1>Library 3 Example</h1>
  <div id="counter">
    <button id="increment">Increment</button>
    <p id="count">0</p>
  </div>
</body>
</html>
`;

const initialCSS3 = `
body {
  background-color: #e8f5e9;
}
h1 {
  color: #388e3c;
}
#counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 10px;
  font-size: 16px;
}
`;

const initialJS3 = `
let count = 0;
document.getElementById('increment').addEventListener('click', function() {
  count++;
  document.getElementById('count').innerText = count;
});
`;

const Library3 = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML3);
  const [cssCode, setCssCode] = useState(initialCSS3);
  const [jsCode, setJsCode] = useState(initialJS3);
  const [activeTab, setActiveTab] = useState("html");

  const runCode = () => {
    try {
      const outputElement = document.getElementById("code-output");
      outputElement.innerHTML = "";

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            ${jsCode}
          <\/script>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.src = url;
      outputElement.appendChild(iframe);

      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  useEffect(() => {
    runCode();
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="library-container">
      <div className="code-editor">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "html" ? "active" : ""}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`tab-button ${activeTab === "css" ? "active" : ""}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          <button
            className={`tab-button ${activeTab === "js" ? "active" : ""}`}
            onClick={() => setActiveTab("js")}
          >
            JavaScript
          </button>
        </div>
        <div className="code-editor-content">
          {activeTab === "html" && (
            <CodeMirror
              value={htmlCode}
              options={{
                mode: "xml",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                fontSize: "16px",
              }}
              onBeforeChange={(editor, data, value) => {
                setHtmlCode(value);
              }}
            />
          )}
          {activeTab === "css" && (
            <CodeMirror
              value={cssCode}
              options={{
                mode: "css",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                fontSize: "16px",
              }}
              onBeforeChange={(editor, data, value) => {
                setCssCode(value);
              }}
            />
          )}
          {activeTab === "js" && (
            <CodeMirror
              value={jsCode}
              options={{
                mode: "javascript",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                fontSize: "16px",
              }}
              onBeforeChange={(editor, data, value) => {
                setJsCode(value);
              }}
            />
          )}
        </div>
        <button onClick={runCode} className="run-button">
          Kodu Çalıştır
        </button>
      </div>
      <div className="code-output" id="code-output">
        {/* çıktı */}
      </div>
    </div>
  );
};

export default Library3;
