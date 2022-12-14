const {
  queryJSXNodePath,
  createPrototyNode,
  hasCardNode,
  createCard,
  queryFirstNode,
  delLibNameAttr,
  hasComponent,
} = require("../utils/tools");

const panelTocard = {
  Title: "title",
  More: "extra",
  Footer: "footer",
};

//插入 Card import
function createImportCard(root, j) {
  // 判断当前页面是否引入了 Card 组件
  const hasCardResult = hasCardNode(root, j);
  if (hasCardResult) return false;
  const FIRST_IMPORT = queryFirstNode(root, j);
  const cardAst = createCard(j);
  FIRST_IMPORT.insertAfter(cardAst);
}

// 获取全部属性的 value
function getAllpropsChild(path, j) {
  let obj = {};
  const moreprops = ["Title", "More", "Footer"];
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
  Object.keys(propsObj).forEach((key) => {
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
    hasComponent(root, j, "dragon-ui", "Panel") || {};
  // 如果当前引入的没有 dragon-ui Button 的话就不往下面走了
  if (!hasComponentPath) return false;
  // 引入 Card
  createImportCard(root, j);
  // 删除 panel
  delLibNameAttr(root, j, "dragon-ui", "Panel");
  // 获取 panel 集合
  const getPanelElements = root.findJSXElements("Panel");
  //  遍历 panel
  getPanelElements.forEach((path) => {
    // 获取 panel 上的所有属性
    const panelAllProps = path.value.openingElement.attributes;
    const currentPath = j(path);
    const itemBody = queryJSXNodePath(path, j, "Body");
    const propsObj = getAllpropsChild(path, j);
    const newPropsNode = createAttrNode({ j: j, propsObj: propsObj });
    // title 的子元素 适合 Collection 集合
    const bodyChild = itemBody.get().value.children;

    currentPath.replaceWith((nodePath) => {
      //  创建 Card 节点
      const openingElement = j.jsxOpeningElement(
        // name
        j.jsxIdentifier("Card"),
        // props
        [...panelAllProps, ...newPropsNode],
        false
      );
      const newNodes = j.jsxElement(
        // 1 openingopeningElement
        openingElement,
        // 2 closingElement
        j.jsxClosingElement(j.jsxIdentifier("Card")),
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
