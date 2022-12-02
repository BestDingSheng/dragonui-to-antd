// 集合 list 转换成 ast 数组
function collectionToAst(collection) {
  let astList = [];
  collection.forEach((item) => {
    astList.push(item.value);
  });
  return astList;
}

function queryJSXNodePath(path, j, name) {
  const currentPath = j(path);
  const result = currentPath.find(j.JSXElement, {
    openingElement: {
      type: "JSXOpeningElement",
      name: {
        type: "JSXMemberExpression",
        property: {
          type: "JSXIdentifier",
          name: name,
        },
      },
    },
  });
  return result;
}

/**
 *  {
 *  <>
 *    child
 *  </>
 * }
 *
 */
function createFragementElement(j, child) {
  return j.jsxExpressionContainer(
    j.jsxFragment(j.jsxOpeningFragment(), j.jsxClosingFragment(), child)
  );
}

// 查找到第一个节点

function queryFirstNode(root, j) {
  const FIRST_IMPORT = root.find(j.ImportDeclaration).at(0);
  return FIRST_IMPORT;
}

// 创建 Card 节点
function createCard(j) {
  return j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier("Card"))],
    j.stringLiteral("@za/hfe-bops-card")
  );
}

//判断是否有 Card 节点
function hasCardNode(root, j) {
  return (
    root
      .find(j.ImportDeclaration, {
        source: {
          value: "@za/hfe-bops-card",
        },
      })
      .size() > 0
  );
}
// 判断什么库是否引入了什么组件
function hasComponent(root, j, libname, component) {
  const getLibname = root.find(j.ImportDeclaration, {
    source: {
      value: libname,
    },
  });
  if (getLibname.length === 0) return false;
  const componentPath = getLibname.find(j.ImportSpecifier, {
    imported: {
      name: component,
    },
  });

  return {
    hasComponentPath: !!componentPath.length,
    componentPath: componentPath,
    libname: getLibname,
  };
}

// 删除什么库中的什么属性
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
  const attrNamePath = libNamePath.find(j.ImportSpecifier, {
    imported: {
      name: attrName,
    },
  });
  const hasAttrName = attrNamePath.length === 1;
  if (hasOneSpecifiers && hasAttrName) {
    // 如果只有 { panel } 那么直接删除 整条 import
    libNamePath.remove();
  } else {
    attrNamePath.remove();
  }
}

// 在什么库中添加什么属性
function libnameAddComponent(root, j, libname, component) {
  // 判断是否有
  const reulst = hasComponent(root, j, libname, component);
  if (!reulst) {
    const FIRST_IMPORT = queryFirstNode(root, j);
    const buttonAntdAst = j.importDeclaration(
      [j.importSpecifier(j.identifier(component), j.identifier(component))],
      j.stringLiteral(libname)
    );
    FIRST_IMPORT.insertAfter(buttonAntdAst);
    return false;
  }
  //
  reulst.libname.replaceWith((node) => {
    let { specifiers } = node.value;
    const buttonAst = j.importSpecifier(
      j.identifier(component),
      j.identifier(component)
    );
    let newSpecifiers = [...specifiers, buttonAst];
    node.value.specifiers = newSpecifiers;
    return node.value;
  });
  // const { libname } = result;
  // 有的话走插入个 button 属性

  // j.importDeclaration(
  //   [j.importSpecifier(j.identifier("Button"), j.identifier("Button"))],
  //   j.stringLiteral("antd")
  // );

  //
}

// 创建属性名称
function createPrototyName(j, name) {
  return j.jsxIdentifier(name);
}

// 创建属性值

function createStringLiteral(j, value) {
  const [item] = value;
  return j.stringLiteral(item.value);
}
// 当 value 只有一个的时候
function createOneValue(j, value) {
  // 判断下类型 是否是 表达式 如果是 直接返回
  const [item] = value;
  if (item.type === "JSXExpressionContainer") {
    return item;
  }

  return createStringLiteral(j, value);
}

// 创建属性节点
function createPrototyNode(j, name, value) {
  const isOneValue = value.length === 1;
  const proName = createPrototyName(j, name);
  const createValue = isOneValue
    ? createOneValue(j, value)
    : createFragementElement(j, value);
  // 创建属性
  return j.jsxAttribute(
    // name
    proName,
    // value
    createValue
  );
}

// 创建字符串属性节点

function createStringPropsAst(j, name, value) {
  const proName = createPrototyName(j, name);
  const createValue = j.stringLiteral(value);
  return j.jsxAttribute(
    // name
    proName,
    createValue
  );
}

// 添加导入属性 import {Modal} from 'antd'
function addImportAttr(root, j, libName, attrName) {
  const libNamePath = root.find(j.ImportDeclaration, {
    source: {
      value: libName,
    },
  });
  libNamePath.replaceWith((node) => {
    const specifiers = node.value.specifiers;
    const ModalNode = j.importSpecifier(
      j.identifier(attrName),
      j.identifier(attrName)
    );
    const newModes = j.importDeclaration(
      [...specifiers, ModalNode],
      j.stringLiteral(libName)
    );

    return newModes;
  });
}

module.exports = {
  collectionToAst,
  queryJSXNodePath,
  createFragementElement,
  createPrototyNode,
  hasCardNode,
  addImportAttr,
  createCard,
  queryFirstNode,
  hasComponent,
  delLibNameAttr,
  libnameAddComponent,
  createStringPropsAst,
};
