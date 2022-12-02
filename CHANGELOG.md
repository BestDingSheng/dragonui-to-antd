# Change Log

All notable changes to the "hello" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release

## [0.0.7] - 2022-12-02 18:08:23

### Added

- Modal Button 组件上如果有 结构属性 那么不会格式化

## [0.0.6] - 2022-12-02 16:51:07

### Fixed

- 修复格式化 Panel 组件 title 如果是 jsx 表达式的时候报错问题

### Added

- 增强 Button 组件格式化功能 ，如果之前有 theme 属性并且 不是 `defualt` 就添加 type = 'primary' 属性

## [0.0.5] - 2022-12-02 12:17:40

### Fixed

- 修复会多次引入 Button 组件 bug

## [0.0.4] - 2022-12-01 16:26:35

### Added

- 支持 Modal 组件替换

### Fixed

- 修复 Panel 组件替换成 Card 组件 more 属性错误, 修改成 extra
