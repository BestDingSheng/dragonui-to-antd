const { run: jscodeshift } = require("jscodeshift/src/Runner");
const path = require("path");
let vscode = null;
try {
  vscode = require("vscode");
} catch (e) {
  // console.log(e);
}

const options = {
  dry: false, // 是否对文件进行修改 true 不修改 false 修改
  print: true, // 是否将转换后的信息打印出来
  verbose: 2, // 格式化信息
  // ...
};

const transformPath = path.resolve(__dirname, "./transform.js");

async function Run() {
  let filePath = null;
  if (!vscode) {
    filePath =
      // "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/modal.jsx";
      "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/case/test.jsx";
  } else {
    filePath = vscode.window.activeTextEditor.document.fileName;
  }
  console.log(filePath);
  if (!filePath) return false;
  const res = await jscodeshift(transformPath, [filePath], options);
  const { ok, nochange } = res;
  if (vscode) {
    if (ok === 1) {
      vscode.window.showInformationMessage("格式化成功");
      return false;
    }
    if (nochange === 1) {
      vscode.window.showInformationMessage("没有可以修改的内容");
      return false;
    }
    vscode.window.showInformationMessage("操作失败");
  }

  // child.exec(`npx jscodeshift ${filePath} --dry --print filePath --transform=${transformPath}`, function(err, sto) {
  // 	console.log(sto);//sto才是真正的输出，要不要打印到控制台，由你自己啊
  // })
}

Run();

module.exports = function () {
  Run();
};
