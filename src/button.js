const {
  hasComponent,
  delLibNameAttr,
  libnameAddComponent,
  createStringPropsAst,
} = require("../utils/tools");
const buttonAttrList = ["isLoading", "isDisabled"];
const buttonAttr = {
  isLoading: "loading",
  isDisabled: "disabled",
};
const buttonDelAttr = ["size", "theme", "radius"];
const { log } = require("../utils/env");

// 1 判断 dragon 是否包含 Button
// 2 判断 antd 是否包含 Button
// 3 删除 dragon 中的 button
// 4 添加 antd button 组件

function replaceButton(root, j) {
  const { hasComponentPath: hasDragonButton } =
    hasComponent(root, j, "dragon-ui", "Button") || {};
  // 如果当前引入的没有 dragon-ui Button 的话就不往下面走了
  if (!hasDragonButton) return false;
  // 添加 antd button
  libnameAddComponent(root, j, "antd", "Button");
  // 删除 dragon-ui Button
  delLibNameAttr(root, j, "dragon-ui", "Button");
  const getPanelElements = root.findJSXElements("Button");
  getPanelElements.forEach((path) => {
    const buttonAllProps = path.value.openingElement.attributes;
    const hasJSXSpreadAttribute = buttonAllProps.some(
      (item) => item.type === "JSXSpreadAttribute"
    );
    debugger;
    if (hasJSXSpreadAttribute) {
      log("当前文件 Button 上有解构的属性 不支持替换");
      process.exit(1);
      return false;
    }
    const currentPath = j(path);
    const openPath = currentPath.find(j.JSXOpeningElement);
    openPath.replaceWith((node) => {
      let typeAst = [];
      let { attributes = [] } = node.value;

      // 替换属性名称
      attributes.forEach((item) => {
        let { name } = item.name;
        debugger;
        let { value } = item.value || {}; // 如果属性没值的话 是没有 item.value 是 null
        if (buttonAttrList.includes(name)) {
          item.name.name = buttonAttr[name];
        }
        // 判断是否有 theme 不等于 default 的属性
        if (name === "theme" && value !== "default") {
          typeAst = [createStringPropsAst(j, "type", "primary")];
        }
      });
      // 过滤出 buttonDelAttr 中的属性
      const newattributes = attributes.filter((item) => {
        const { name } = item.name;
        return !buttonDelAttr.includes(name);
      });
      node.value.attributes = [...typeAst, ...newattributes];
      return node.value;
    });
  });
}

module.exports = function (root, j) {
  replaceButton(root, j);
};
