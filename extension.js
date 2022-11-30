const vscode = require("vscode");
const Run = require("./src/index");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand("toAntd", function () {
    Run();
  });

  let menu = vscode.commands.registerTextEditorCommand(
    "menuToAntd",
    function (options) {
      Run();
    }
  );

  context.subscriptions.push(disposable, menu);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
