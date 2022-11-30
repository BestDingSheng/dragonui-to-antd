// 期望
// 实现思路
// 1 提取 title 中的 value
// 2 如果有 more 的话 提取 more
// 3 提取 body 中的子元素
// 创建 Card 节点
// 创建 title 属性
const {
  queryJSXNodePath,
  createPrototyNode,
  hasCardNode,
  createCard,
  queryFirstNode,
} = require("../utils/tools");

const panelTocard = {
  Title: "title",
  More: "more",
  Footer: "footer",
};

//插入 Card import
function createImportCard(root, j) {
  const hasCardResult = hasCardNode(root, j);
  if (hasCardResult) return false;
  const FIRST_IMPORT = queryFirstNode(root, j);
  const cardAst = createCard(j);
  FIRST_IMPORT.insertAfter(cardAst);
}

// 删除 dragon import 中 panel 的属性
function delLibNameAttr(root, j, libName, attrName) {
  // 判断是否只有一个
  const libNamePath = root.find(j.ImportDeclaration, {
    source: {
      value: libName,
    },
  });
  // 如果没找到的话那么就不忘下面走了
  if (libNamePath.length === 0) return false;
  const libnode = libNamePath.get();
  const { specifiers = [] } = libnode.value;
  const hasOneSpecifiers = specifiers.length === 1;
  const panelPath = libNamePath.find(j.ImportSpecifier, {
    imported: {
      name: attrName,
    },
  });
  const hasAttrName = panelPath.length === 1;
  if (hasOneSpecifiers && hasAttrName) {
    // 如果只有 { panel } 那么直接删除 整条 import
    libNamePath.remove();
  } else {
    panelPath.remove();
  }
}

// 获取全部属性的子元素
function allProps(path, j) {
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

// 生成节点

// panel 替换成 card
function replacePanel(root, j) {
  // 引入 Card
  createImportCard(root, j);
  // 删除 panel
  delLibNameAttr(root, j, "dragon-ui", "Panel");
  // 获取 panel 集合
  const getPanelElements = root.findJSXElements("Panel");
  //  遍历 panel
  getPanelElements.forEach((path) => {
    const panelAllProps = path.value.openingElement.attributes;
    const currentPath = j(path);
    const itemBody = queryJSXNodePath(path, j, "Body");
    const propsObj = allProps(path, j);
    const newPropsNode = createAttrNode({ j: j, propsObj: propsObj });
    // title 的子元素 适合 Collection 集合
    const bodyChild = itemBody.get().value.children;

    currentPath.replaceWith((nodePath) => {
      //  创建 Card 节点
      const newNodes = j.jsxElement(
        // 1 openingopeningElement
        j.jsxOpeningElement(
          // 1 name
          j.jsxIdentifier("Card"),
          [...panelAllProps, ...newPropsNode],
          false
        ),
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
  return root.toSource();
};
