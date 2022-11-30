const vscode = require("vscode");
const path = require("path");

const { run: jscodeshift } = require("jscodeshift/src/Runner");
const options = {
  dry: false, // 是否对文件进行修改 true 不修改 false 修改
  print: true, // 是否将转换后的信息打印出来
  verbose: 2, // 格式化信息
};

function replace() {
  const transformPath = path.resolve(__dirname, "./transform.js");
  const filePath = vscode.window.activeTextEditor.document.fileName;
  if (!filePath) return false;

  jscodeshift(transformPath, [filePath], options).then((res, options) => {
    const { ok, nochange } = res;
    if (ok === 1) {
      vscode.window.showInformationMessage("格式化成功");
      return false;
    }
    if (nochange === 1) {
      vscode.window.showInformationMessage("没有可以修改的内容");
      return false;
    }
    vscode.window.showInformationMessage("操作失败");
  });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand("toAntd", function () {
    replace();
  });

  let menu = vscode.commands.registerTextEditorCommand(
    "menuToAntd",
    function (options) {
      replace();
    }
  );

  context.subscriptions.push(disposable, menu);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
