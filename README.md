# e采前端实验室（CjLab）

## 快速开始

#### 1、项目安装
- 执行 `npm install` 命令即可

#### 2、开发时调试
- 执行 `npm start` 命令即可

#### 3、测试（尚未完善）
- 执行 `npm run test` 命令即可

#### 4、项目构建
- 执行 `npm run build` 命令即可

#### 5、执行代码检查
- 执行 `npm run lint` 命令即可

#### 6、执行代码修复
- 执行 `npm run lint:fix` 命令即可
> 该修复只能修复对代码没影响的问题，有些需要手动修复

#### 7、清理 dist 文件夹
- 执行 `npm run clean` 命令即可

#### 8、预编译vendors库
- 执行 `npm run dll` 命令即可

## 项目介绍

### 目录结构

```
react                   react项目根目录
  ├─config              配置目录
  ├─dist                生产目录
  ├─node_modules
  ├─public              公共全局资源目录
  ├─src                 开发目录
  │   ├─actions
  │   ├─components
  │   ├─containers
  │   ├─core
  │   ├─reducers
  │   ├─utils
  │   ├─view            视图目录
  │   ├─index.html
  │   ├─index.js
  │   └─routes.js
  ├─.babelrc            babel配置文件
  ├─.eslintrc.js        eslint配置文件
  ├─.gitignore
  ├─.stylelintignore    stylelint忽略配置
  ├─.stylelintrc        stylelint配置
  ├─CHANGELOG           版本变更日志
  ├─CONTRIBUTING.md     
  ├─package.json
  ├─postcss.config.js   postcss配置文件
  ├─README.md
  ├─server.js           webpack-dev-server启动脚本
  └─webpack.config.js
```

### 具备特征

- webpack2.X
- 热替换
- source-map
- babel
- tree-shaking
- 预编译
- eslint
- postcss
- 样式模块化
- stylelint
- 动态路由
- redux-devtools-extension

### 待添加
- immutable
- reselect
- docker
- happypack
- ……

## 备注
- PropTypes 新版本 React 中不建议通过 React.PropTypes 的方式调用，要通过 `import PropTypes from 'prop-types'` 引入;