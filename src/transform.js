const replaceButton = require("./button");
const replacePanel = require("./panel");

module.exports = function (file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  replacePanel(root, j);
  replaceButton(root, j);
  return root.toSource();
};
