import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./LibraryContent.css";

const initialHTML6 = `
<!DOCTYPE html>
<html>
<head>
  <title>Library 6</title>
</head>
<body>
  <h1>Library 6 Example</h1>
  <form id="form">
    <input type="text" id="username" placeholder="Enter username" />
    <button id="submit">Submit</button>
    <div id="response"></div>
  </form>
</body>
</html>
`;

const initialCSS6 = `
body {
  background-color: #f3e5f5;
}
h1 {
  color: #ab47bc;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin: 10px;
  padding: 10px;
}
button {
  padding: 10px;
}
`;

const initialJS6 = `
document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  document.getElementById('response').innerHTML = '<h2>Hello, ' + username + '!</h2>';
});
`;

const Library6 = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML6);
  const [cssCode, setCssCode] = useState(initialCSS6);
  const [jsCode, setJsCode] = useState(initialJS6);
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

export default Library6;
