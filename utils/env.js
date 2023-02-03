let vscode = null;

try {
  vscode = require("vscode");
} catch (e) {}

function log(value) {
  if (vscode) {
    vscode.window.showInformationMessage(value);
  } else {
    console.log("---- logs:", value);
  }
}

function getFormatFilePath() {
  let filePath =
    // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/modal.jsx";
    // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/test.jsx";
    // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/fail.jsx";
    "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/fail.tsx";
  if (vscode) {
    return vscode.window.activeTextEditor.document.fileName;
  }
  return filePath;
}

function getFileType() {
  const fileName = getFormatFilePath();
  const fileExtension = fileName.split(".").pop().toLowerCase();
  return fileExtension;
}

module.exports = {
  log,
  getFormatFilePath,
  getFileType,
};
