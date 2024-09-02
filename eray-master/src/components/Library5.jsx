import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./LibraryContent.css";

const initialHTML5 = `
<!DOCTYPE html>
<html>
<head>
  <title>Library 5</title>
</head>
<body>
  <h1>Library 5 Example</h1>
  <ul id="list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <button id="add">Add Item</button>
</body>
</html>
`;

const initialCSS5 = `
body {
  background-color: #f1f8e9;
}
h1 {
  color: #558b2f;
}
ul {
  list-style-type: square;
}
button {
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
}
`;

const initialJS5 = `
document.getElementById('add').addEventListener('click', function() {
  const ul = document.getElementById('list');
  const newItem = document.createElement('li');
  newItem.textContent = 'New Item';
  ul.appendChild(newItem);
});
`;

const Library5 = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML5);
  const [cssCode, setCssCode] = useState(initialCSS5);
  const [jsCode, setJsCode] = useState(initialJS5);
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

export default Library5;
