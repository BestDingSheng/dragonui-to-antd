let vscode = null;

try {
  vscode = require("vscode");
} catch (e) {}

function log(value) {
  if (vscode) {
    vscode.window.showInformationMessage(value);
    return false;
  }
  console.log("---- logs:", value);
}

function getFormatFilePath() {
  let filePath =
    // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/modal.jsx";
    // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/test.jsx";
    "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/fail.jsx";
  if (vscode) {
    return vscode.window.activeTextEditor.document.fileName;
  }
  return filePath;
}

module.exports = {
  log,
  getFormatFilePath,
};
