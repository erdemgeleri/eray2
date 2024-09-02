import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Codemirror tema stili

// Başlangıç kodları
const initialHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
  <style>
    body { font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <button id="btn">Click me</button>
  <div id="result"></div>
</body>
</html>
`;

const initialCSS = `
body {
  background-color: #f0f0f0;
}
h1 {
  color: #333;
}
`;

const initialJS = `
document.getElementById('btn').addEventListener('click', function() {
  document.getElementById('result').innerHTML = '<h2>Button Clicked!</h2>';
});
`;

const LibraryContent = () => {
  const [htmlCode, setHtmlCode] = useState(initialHTML);
  const [cssCode, setCssCode] = useState(initialCSS);
  const [jsCode, setJsCode] = useState(initialJS);
  const [activeTab, setActiveTab] = useState("html"); // Başlangıç sekmesi

  // Kodun çalıştırılması ve iframe'e yazdırılması
  const runCode = () => {
    try {
      const outputElement = document.getElementById("code-output");
      outputElement.innerHTML = ""; // Önceki içeriği temizle

      // HTML içeriğini oluşturun
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

      // HTML içeriğini bir Blob nesnesi olarak oluşturun
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      // Blob URL'yi kullanarak bir iframe oluşturun
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.src = url;
      outputElement.appendChild(iframe);

      // URL'yi temizleyin
      return () => URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  // Kod değiştiğinde çalıştır
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
        {/* Kodun çıktısı burada gösterilecek */}
      </div>
    </div>
  );
};

export default LibraryContent;
