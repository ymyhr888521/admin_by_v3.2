

> LPF_TEST_DEMO，基于 Vue3.2、TypeScript、Vite2、Pinia、Element-Plus 开发的一套后台管理模板。

### 功能

- 使用 Vue3.2 开发，单文件组件 `＜script setup＞`
- 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、TSX 语法、跨域代理、打包预览工具……）
- 整个项目集成了最新版TypeScript
- 使用 Pinia（大菠萝） 替代 Vuex，轻量、简单、易用（集成了持久化插件）
- 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、取消重复请求……）
- 对表格的所有操作基本都封装成了 Hooks （表格数据搜索、重置、查询、分页、多选、单条数据操作、文件上传、下载、格式化单元格内容……）
- 基于 Element 二次封装，表格页面全部传成配置项 Columns
- 支持 Element 组件大小切换、暗黑模式、i18n 国际化（i18n 暂时没配置所有文件，根据项目自行配置）
- 使用 vue-router 进行路由权限拦截（403 页面）、页面按钮权限配置
- 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面（缓存路由里可配置、页面切换带动画）
- 常用自定义指令开发（复制、水印、拖拽、节流、防抖、长按……）
- 后期继续维护开发
### 安装使用步骤 📔

- **Install：**

```text
npm install / yarn 
cnpm install / yarn 

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org


- **Run：**

```text
npm run dev
npm run serve
yarn dev
yarn serve
```

- **Build：**

```text
# 开发环境
npm run build:dev
yarn build:dev

# 测试环境
npm run build:test
yarn build:test

# 生产环境
npm run build:pro
yarn build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint
yarn lint:eslint

# prettier 格式化代码
npm run lint:prettier
yarn lint:prettier

# stylelint 格式化样式
lint:stylelint
yarn lint:stylelint
```

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令） 已删除 等后期用husky完善
npm run commit
```

### 文件资源目录 📚

```text
lpf_test_admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layout              # 框架布局
│  ├─ routers             # 路由管理
│  ├─ store               # pinia store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 所有页面
│  ├─ App.vue             # 入口页面
│  ├─ env.d.ts            # ts 识别 vue 文件
│  └─ main.ts             # 入口文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置
├─ package-lock.json      # 包版本锁
├─ package.json           # 包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ STANDARD.md            # 项目规范文档
├─ stylelint.config.js    # stylelint 格式化配置
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```
