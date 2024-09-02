import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./LibraryContent.css";

const initialHTML4 = `
<!DOCTYPE html>
<html>
<head>
  <title>Library 4</title>
</head>
<body>
  <h1>Library 4 Example</h1>
  <p id="text">Hover over this text</p>
</body>
</html>
`;

const initialCSS4 = `
body {
  background-color: #fce4ec;
}
h1 {
  color: #d81b60;
}
#text {
  font-size: 18px;
  padding: 20px;
  border: 1px solid #d81b60;
}
#text:hover {
  background-color: #d81b60;
  color: white;
}
`;

const initialJS4 = `
document.getElementById('text').addEventListener('mouseover', function() {
  this.style.color = 'white';
  this.style.backgroundColor = '#d81b60';
});
document.getElementById('text').addEventListener('mouseout', function() {
  this.style.color = '#d81b60';
  this.style.backgroundColor = 'transparent';
});
`;

const Library4 = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML4);
  const [cssCode, setCssCode] = useState(initialCSS4);
  const [jsCode, setJsCode] = useState(initialJS4);
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

export default Library4;
