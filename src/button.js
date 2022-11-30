const {
  hasComponent,
  delLibNameAttr,
  libnameAddComponent,
} = require("../utils/tools");
const buttonAttrList = ["isLoading", "isDisabled"];
const buttonAttr = {
  isLoading: "loading",
  isDisabled: "disabled",
};
const buttonDelAttr = ["size", "theme"];

// 1 判断 dragon 是否包含 Button
// 2 判断 antd 是否包含 Button
// 3 删除 dragon 中的 button
// 4 添加 antd button 组件

function replaceButton(root, j) {
  const { hasComponentPath: hasDragonButton } =
    hasComponent(root, j, "dragon-ui", "Button") || {};
  // 如果当前引入的没有 dragon-ui Button 的话就不往下面走了
  if (!hasDragonButton) return false;
  // 删除 dragon-ui Button
  delLibNameAttr(root, j, "dragon-ui", "Button");
  // 添加 antd button
  libnameAddComponent(root, j, "antd", "Button");
  const getPanelElements = root.findJSXElements("Button");
  getPanelElements.forEach((path) => {
    const currentPath = j(path);
    const openPath = currentPath.find(j.JSXOpeningElement);
    openPath.replaceWith((node) => {
      let { attributes = [] } = node.value;
      attributes.forEach((item) => {
        let { name } = item.name;
        if (buttonAttrList.includes(name)) {
          item.name.name = buttonAttr[name];
        }
      });
      const newattributes = attributes.filter((item) => {
        const { name } = item.name;
        return !buttonDelAttr.includes(name);
      });
      node.value.attributes = newattributes;
      return node.value;
    });
  });
}

module.exports = function (root, j) {
  replaceButton(root, j);
};
