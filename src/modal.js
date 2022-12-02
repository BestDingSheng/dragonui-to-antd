const {
  queryJSXNodePath,
  createPrototyNode,
  delLibNameAttr,
  hasComponent,
  libnameAddComponent,
} = require("../utils/tools");

const { log } = require("../utils/env");

/**
 * 1 获取 Modal 上的属性
 * 2 获取 Modal.Header 上的属性
 * 3 获取 body 元素
 * 4 获取 footer 元素
 * 5 onClose 属性替换成 onCancel
 */

const panelTocard = {
  Footer: "footer",
};

// 获取全部属性的 value
function getAllpropsChild(path, j) {
  let obj = {};
  const moreprops = ["Footer"];
  moreprops.forEach((item) => {
    const result = queryJSXNodePath(path, j, item);
    if (result.length > 0) {
      obj[item] = result.get().value.children;
    }
  });
  return obj;
}

// 生成 新的属性节点
function createAttrNode(options) {
  const { j, propsObj } = options;
  const newAttrNode = [];
  const propsObjList = Object.keys(propsObj);
  //   propsObjList 是空话那就说明没有找到 footer 那么这个时候需要创建 footer={null}
  if (propsObjList.length === 0) {
    let footerAst = j.jsxAttribute(
      // name
      j.jsxIdentifier("footer"),
      // value
      j.jsxExpressionContainer(j.nullLiteral())
    );
    newAttrNode.push(footerAst);
    return newAttrNode;
  }
  propsObjList.forEach((key) => {
    // 获取属性的 key
    const propsKey = panelTocard[key];
    const propsChild = propsObj[key];
    let node = createPrototyNode(j, propsKey, propsChild);
    newAttrNode.push(node);
  });
  return newAttrNode;
}

// panel 替换成 card
function replacePanel(root, j) {
  const { hasComponentPath } =
    hasComponent(root, j, "dragon-ui", "Modal") || {};
  // 如果当前引入的没有 dragon-ui Button 的话就不往下面走了
  if (!hasComponentPath) return false;
  // 添加 antd button
  libnameAddComponent(root, j, "antd", "Modal");
  // 删除 dragon-ui Button
  delLibNameAttr(root, j, "dragon-ui", "Modal");
  //   // 获取 panel 集合
  const getPanelElements = root.findJSXElements("Modal");
  //  遍历 panel
  getPanelElements.forEach((path) => {
    // 获取 panel 上的所有属性
    const panelAllProps = path.value.openingElement.attributes;
    const itemBody = queryJSXNodePath(path, j, "Body");
    const itemHeader = queryJSXNodePath(path, j, "Header").get();
    const headerProps = itemHeader.value.openingElement.attributes;
    const propsObj = getAllpropsChild(path, j);
    // 创建新属性
    const newPropsNode = createAttrNode({ j: j, propsObj: propsObj });
    // title 的子元素 适合 Collection 集合
    const bodyChild = itemBody.get().value.children;
    // 判断是否有结构属性
    const hasJSXSpreadAttribute = panelAllProps.some(
      (item) => item.type === "JSXSpreadAttribute"
    );
    if (hasJSXSpreadAttribute) {
      log("当前 modal 上有解构的属性 不支持替换");
      process.exit(1);
      return false;
    }
    // 修改属性
    const ndoeAllProps = [...panelAllProps, ...headerProps, ...newPropsNode];
    ndoeAllProps.forEach((item) => {
      if (item.name.name === "onClose") {
        item.name.name = "onCancel";
      }
    });
    const currentPath = j(path);
    currentPath.replaceWith((nodePath) => {
      const openingElement = j.jsxOpeningElement(
        // name
        j.jsxIdentifier("Modal"),
        // props
        ndoeAllProps,
        false
      );
      const newNodes = j.jsxElement(
        // 1 openingopeningElement
        openingElement,
        // 2 closingElement
        j.jsxClosingElement(j.jsxIdentifier("Modal")),
        // 3 children
        bodyChild
      );

      return newNodes;
    });
  });
}

module.exports = function (root, j) {
  replacePanel(root, j);
};
