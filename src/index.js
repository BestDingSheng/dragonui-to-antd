const { run: jscodeshift } = require("jscodeshift/src/Runner");
const path = require("path");
const vscode = require("vscode");
// const vscode = false;
// var child = require("child_process");

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
    filePath = "/Users/dingsheng/Desktop/opensource/vscode-ast-plugin/home.jsx";
  } else {
    filePath = vscode.window.activeTextEditor.document.fileName;
  }
  console.log(filePath);
  if (!filePath) return false;
  debugger;
  const res = await jscodeshift(transformPath, [filePath], options);
  console.log(res);

  // child.exec(`npx jscodeshift ${filePath} --dry --print filePath --transform=${transformPath}`, function(err, sto) {
  // 	console.log(sto);//sto才是真正的输出，要不要打印到控制台，由你自己啊
  // })
}

module.exports = function () {
  Run();
};
