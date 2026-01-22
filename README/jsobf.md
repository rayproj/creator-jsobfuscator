# JavaScript-Obfuscator

**更新**：`2024年1月22日 09点48分`

> 参考链接
>
> [js-obfuscator](https://obfuscator.io/) | [js-obf 选项](jsobfOpt.md)
>
> [js-ast](https://astexplorer.net/)

### 关于

此工具用于混淆打乱 **`Cocos Creator`** 工程构建后 **`js code`**

- 适用环境：**`nodejs v18.17.0`**（并不一定需要v18，如果出现npm或npx错误请使用高版本nodejs重试）

- 适用版本：**`v3.7.x`**
- 适用平台：**`wechatgame`**

> **使用前如有需要请自行备份**
>
> 注：其他 creator版本 和 目标平台 暂无测试和适配

### 如何使用

- **首次使用**

  ```javascript
  // 安装依赖
  npm i
  // 编译
  npx tsc
  // 运行
  node dist "任务名" "项目目录\build\wechatgame"
  ```

- **修改或更新typescript文件后**

  ```javascript
  // 编译
  npx tsc
  ```

- **运行**

  ```javascript
  // 运行目标任务
  node dist "任务名" "项目目录\build\wechatgame"
  ```



### 默认任务

- ### default-pipeline

  > 入口：`node dist "项目目录\build\wechatgame"`
  >
  > 包含任务：[merge-bundlejs](#merge-bundlejs) **>>** [js-obfuscator](#js-obfuscator) **>>** [extract-obfstring](#extract-obfstring)

可选任务：

- ### merge-bundlejs

  > 入口：`node dist/merge-bundle "项目目录\build\wechatgame"`
  >
  > 功能：合并 `bundle-scripts` 目录下所有 js 文件，清空该目录，输出一个 **index.js**

- ### random-chunkname

  > 入口：`node dist/random-chunkname "项目目录\build\wechatgame"`
  >
  > 功能：遍历 目标根目录 下所有 chunk相关 js 文件，随机 chunk 的明文注册并更新依赖

- ### js-obfuscator

  > 入口：`node dist/js-obfuscator "项目目录\build\wechatgame"`
  >
  > 功能：混淆 目标根目录 下的 相关 js 文件

- ### extract-obfstring

  > 入口：`node dist/extract-obfstring "项目目录\build\wechatgame"`
  >
  > 功能：提取 [js-obfuscator](#js-obfuscator) 后的js文件中的 stringarray ，并适配
