const path = require("path");
const { run: jscodeshift } = require("jscodeshift/src/Runner");
const { log, getFormatFilePath } = require("../utils/env");

const options = {
  dry: false, // 是否对文件进行修改 true 不修改 false 修改
  print: true, // 是否将转换后的信息打印出来
  verbose: 2, // 格式化信息
  // ...
};

const transformPath = path.resolve(__dirname, "./transform.js");

async function Run() {
  let filePath = getFormatFilePath();
  if (!filePath) return false;
  try {
    // 内部已经捕获了错误 ，错误信息不回传到这里
    const res = await jscodeshift(transformPath, [filePath], options);
    const { ok, nochange } = res;
    if (ok === 1) {
      log("格式化成功");
      return false;
    }
    if (nochange === 1) {
      log("没有可以修改的内容");
      return false;
    }
    log("操作失败");
  } catch (e) {}

  // child.exec(`npx jscodeshift ${filePath} --dry --print filePath --transform=${transformPath}`, function(err, sto) {
  // 	console.log(sto);//sto才是真正的输出，要不要打印到控制台，由你自己啊
  // })
}

module.exports = function () {
  Run();
};
