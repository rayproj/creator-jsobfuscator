# JavaScript-Obfuscator 选项

**更新**：`2024年1月22日 10点32分`

### Available Options

- **compact**

  ```javascript
  // 是否输出为一行
  @default true
  ```

- **simplify**

  ```javascript
  // 是否简化代码
  @default true
  ```
  
---

- **controlFlowFlattening**

  ```javascript
  // 是否混淆代码的控制流程，即插入虚假的控制流程（调用堆栈）
  // ⚠️此选项会影响 js 执行性能
  @default false
  ```

- **controlFlowFlatteningThreshold**

  ```javascript
  // 受影响的节点百分比，开启`controlFlowFlattening`时生效，值越大被混淆的节点越多。
  @default 0.75[0, 1]
  ```

---

- **deadCodeInjection**

  ```javascript
  // 是否插入随机 deadCode
  // ⚠️此选项会影响 js 文件大小
  @default false
  ```

- **deadCodeInjectionThreshold**

  ```javascript
  // 受影响的节点百分比，开启`deadCodeInjection`时生效
  @default 0.4[0, 1]
  ```

---

- **debugProtection**

  ```javascript
  // 是否注入无限 debugger ，在浏览器端对防止逆向很有用
  // ⚠️此选项会导致进入 Console 页面时无限断点
  @default false
  ```

- **debugProtectionInterval**

  ```javascript
  // debugger 时间间隔，开启`debugProtection`时生效
  @default 0 // 单位：毫秒 推荐值：[2000, 4000]
  ```

---

- **disableConsoleOutput**

  ```javascript
  // 是否禁用 console 相关日志输出
  // ⚠️此选项会禁用日志
  @default false
  @creator false // 关闭原因：1.与项目日志开关冲突 2.影响 js 性能和大小
  ```

- **domainLock**

  ```javascript
  // 设置 js 代码执行域名白名单
  @default []
  ```

- **domainLockRedirectUrl**

  ```javascript
  // 非白名单域名时重定向 url
  @default about:blank
  ```

- **identifierNamesGenerator**

  ```javascript
  // 设置变量名生成方式
  @default hexadecimal
  ```

- **renameProperties**

  ```javascript
  // 重命名属性名
  // ⚠️此选项可能导致运行时错误
  @default false
  ```

- **renamePropertiesMode**

  ```javascript
  // 重命名属性模式
  // ⚠️即使`safe`模式下依旧可能导致运行时错误
  @default safe
  ```

- **reservedNames**

  ```javascript
  // 保留的属性名，`renameProperties`打开时生效
  @default []
  ```

- **identifierNamesCache**

  ```javascript
  // 设置匹配的变量名为指定值，可设置 全局变量 和 属性名，可用于同步多文件变量名
  // 全局变量只会匹配修改 未声明 的变量，修改属性名时需要打开`renameProperties`
  @default null
  ```

- **identifiersDictionary**

  ```javascript
  // 仅当`identifierNamesGenerator`:`dictionary`时有用
  @default []
  ```

- **renameGlobals**

  ```javascript
  // 重命名全局变量
  // ⚠️此选项可能导致运行时错误
  @default false
  ```

- **identifiersPrefix**

  ```javascript
  // 对全局变量名增加前缀，开启`renameGlobals`时生效，混淆多个文件时推荐开启，每个文件前缀应不同
  @default ''
  ```

- **numbersToExpressions**

  ```javascript
  // 是否将数字转换为表达式
  @default false
  ```

- **selfDefending**

  ```javascript
  // 启用此选项时混淆后的代码会变得唯一，任何修改操作都会导致 js 代码运行错误，包括`格式化`
  @default false
  ```

- **splitStrings**

  ```javascript
  // 是否分割字符串为表达式
  @default false
  ```

- **splitStringsChunkLength**

  ```javascript
  // 分割长度，启用`splitStrings`时生效
  @default 10
  ```

- **stringArray**

  ```javascript
  // 是否转换字符串字面值 到 stringArray 中
  // ⚠️此选项会影响 js 执行效率
  @default true
  ```

- **stringArrayEncoding**

  ```javascript
  // 是否对 stringArray 进行加密
  // ⚠️此选项会影响 js 执行效率
  @default []
  ```

- **stringArrayThreshold**

  ```javascript
  // 受 stringArray 的 node 百分比
  @default 0.8[0, 1]
  ```

- **stringArrayCallsTransform**

  ```javascript
  @default false
  ```
  
- **stringArrayCallsTransformThreshold**

  ```javascript
  @default 0.5
  ```
  
- **stringArrayIndexesType**

  ```javascript
  @default ['hexadecimal-number']
  ```
  
- **stringArrayIndexShift**

  ```javascript
  @default true
  ```
  
- **stringArrayRotate**

  ```javascript
  @default true
  @creator false // 关闭可以减少 stringArray 的长度
  ```

- **stringArrayShuffle**

  ```javascript
  @default true
  ```
  
- **stringArrayWrappersCount**

  ```javascript
  @default 1
  ```
  
- **stringArrayWrappersChainedCalls**

  ```javascript
  @default true
  ```
  
- **stringArrayWrappersType**

  ```javascript
  @default variable
  ```
  
- **stringArrayWrappersParametersMaxCount**

  ```javascript
  // stringArrayWrappersType 为 function 时生效
  @default 2 推荐值: [2, 5]
  ```

- **transformObjectKeys**

  ```javascript
  // 是否启用 obj key转换
  @default false
  
  // 例如
  // in
  var a = { name: 'rayproj' }
  // out
  var a = {}
  a['name] = 'rayproj'
  ```

- **ignoreImports**

  ```javascript
  // 混淆时忽略 require 相关字符串，`stringArray`开启生效
  @default false
  ```

- **reservedStrings**

  ```javascript
  // 禁用转换的字符串列表，`stringArray`开启生效
  @default []
  ```

- **forceTransformStrings**

  ```javascript
  // 设置强制转换的字符串列表，`stringArray`开启生效，会覆盖 reservedStrings 设置中的字符串
  @default []
  ```

- **sourceMap**

  ```javascript
  // 是否生成 sourceMap
  @default false
  ```
  
- **sourceMapMode**

  ```javascript
  // 指定 sourceMap 生成方式，插入 js 文件内 或 生成新文件
  @default separate
  ```
  
- **sourceMapBaseUrl**

  ```javascript
  // sourceMap BaseUrl，只在`separate`下生效
  @default ''
  ```
  
- **sourceMapFileName**

  ```javascript
  // sourceMap 文件名，只在`separate`下生效
  @default ''
  ```
  
- **sourceMapSourcesMode**

  ```javascript
  // sourceMap 文件内容，是否包含源码
  @default sources-content
  ```
  
- **inputFileName**

  ```javascript
  // `sourceMapSourcesMode`:`sources`时有效
  @default ''
  ```
  
- **log**

  ```javascript
  // 是否显示混淆日志
  @default false
  @creator true // 我们的混淆工具运行环境为本地nodejs，建议开启
  ```
  
- **optionsPreset**

  ```javascript
  // 选择预设配置 low-obfuscation
  ```
  
- **seed**

  ```javascript
  // 设置混淆的随机种子，相同的随机种子结果相同，为 0 时每次结果都不同
  @default 0
  ```
  
- **target**

  ```javascript
  // 运行目标平台
  @default browser
  ```
  
- **unicodeEscapeSequence**

  ```javascript
  // 字符串转换为 unicode
  // ⚠️此选项会影响 js 文件大小
  @default false
  ```