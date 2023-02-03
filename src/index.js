const path = require("path");
const { run: jscodeshift } = require("jscodeshift/src/Runner");
const { log, getFormatFilePath, getFileType } = require("../utils/env");
// const child_process = require("child_process");

const parserMap = {
  jsx: "babel",
  js: "babel",
  ts: "tsx",
  tsx: "tsx",
};

const transformPath = path.resolve(__dirname, "./transform.js");

async function Run() {
  const fileType = getFileType();
  const filePath = getFormatFilePath();
  if (!filePath) return false;
  const parserValue = parserMap[fileType] || "babel";
  const options = {
    dry: false, // 是否对文件进行修改 true 不修改 false 修改
    print: false, // 是否将转换后的信息打印出来
    verbose: 2, // 格式化信息
    parser: parserValue,
    // ...
  };

  const res = await jscodeshift(transformPath, [filePath], options);
  const { ok, nochange } = res;
  if (ok === 1) {
    log("格式化成功,快来验证下你的代码吧~");
    return false;
  }
  if (nochange === 1) {
    log("你的代码很棒,暂时没有可以修改的内容");
    return false;
  }
  log("代码格式化失败,请到 README 中查看常见的失败原因");

  // child_process.exec(
  //   `npx jscodeshift ${filePath} --dry --print --transform=${transformPath}`,
  //   function (err, sto, de) {
  //     debugger;
  //     console.log(sto); //sto才是真正的输出，要不要打印到控制台，由你自己啊
  //   }
  // );
}

module.exports = function () {
  Run();
};
