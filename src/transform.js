const replaceButton = require("./button");
const replacePanel = require("./panel");
const replaceModal = require("./modal");
const { getFileType } = require("../utils/env");

module.exports = function (file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  replacePanel(root, j);
  replaceButton(root, j);
  replaceModal(root, j);
  return root.toSource({
    // arrayBracketSpacing: true,
    // objectCurlySpacing: true,
    // arrowParensAlways: true,
    // flowObjectCommas: true,
  });
};

// module.exports.parser = "tsx";
