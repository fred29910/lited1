# Lit + Bun 项目工程化设计指南

本文档为基于 Lit 和 Bun 的现代化 Web 项目提供了一套工程化的、可扩展且易于维护的代码结构方案。

---

## 1. 项目目录结构

一个清晰、可预测的目录结构是项目可维护性的基石。推荐采用以下结构：

```
/
├── .vscode/                # VSCode 编辑器配置
│   └── settings.json
├── dist/                   # 构建产物目录
├── public/                 # 静态资源，会被直接复制到 dist
│   └── vite.svg
├── src/                    # 源代码目录
│   ├── assets/             # 编译处理的静态资源 (图片, 字体等)
│   │   ├── fonts/
│   │   └── images/
│   ├── components/         # 可复用组件
│   │   ├── ui/             # 基础UI组件 (原子组件，如 ui-button, ui-input)
│   │   └── features/       # 业务功能组件 (分子/组织，如 product-card)
│   ├── config/             # 项目配置文件 (环境变量, API地址等)
│   │   └── index.ts
│   ├── layouts/            # 页面布局组件 (如 main-layout, auth-layout)
│   ├── pages/              # 页面级组件 (视图，由组件和布局构成)
│   │   ├── home-page.ts
│   │   └── about-page.ts
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── services/           # 业务服务 (API请求等)
│   │   └── api-client.ts
│   ├── store/              # 全局状态管理
│   │   ├── auth-context.ts # 认证相关的状态
│   │   └── theme-context.ts  # 主题相关的状态
│   ├── styles/             # 全局样式和变量
│   │   ├── _variables.css
│   │   └── global.css
│   ├── types/              # TypeScript 类型定义
│   │   └── index.d.ts
│   ├── utils/              # 通用工具函数
│   │   └── formatters.ts
│   └── main.ts             # 应用入口文件
├── .editorconfig           # 统一不同编辑器的代码风格
├── .eslintrc.cjs           # ESLint 配置文件
├── .gitignore              # Git 忽略文件
├── .prettierrc             # Prettier 配置文件
├── bun.lockb               # Bun 依赖锁定文件
├── index.html              # 入口 HTML
├── package.json            # 项目元数据和依赖
├── tsconfig.json           # TypeScript 配置文件
└── README.md               # 项目说明
```

**核心理念**:

- **关注点分离 (SoC)**：`components`, `pages`, `router`, `store`, `services` 各司其职。
- **约定优于配置**：看到目录名就知道里面是什么，降低新成员上手难度。
- **扩展性**：当项目变大时，可以在 `features` 或 `pages` 目录下创建子目录来组织相关模块。

---

## 2. 组件化策略

采用分层设计，将组件分为不同的层次，以提高复用性并隔离复杂度。

- **基础 UI 组件 (`src/components/ui/`)**
  - **定义**：原子化的、无业务逻辑的纯 UI 单元。例如按钮 (`ui-button.ts`)、输入框 (`ui-input.ts`)、卡片 (`ui-card.ts`)。
  - **特点**：
    - 通过 CSS Parts 和 CSS Custom Properties 提供高度可定制的样式 API。
    - 通过属性 (Properties) 接收数据，通过事件 (Events) 向外通信。
    - 项目内最稳定、复用率最高的部分。

- **业务功能组件 (`src/components/features/`)**
  - **定义**：由一个或多个基础组件和 HTML 标签组合而成，包含特定业务逻辑。例如 `user-profile-editor`。
  - **特点**：
    - 通常与 `services` 和 `store` 交互。
    - 为特定业务场景服务，复用范围相对较小。

- **布局组件 (`src/layouts/`)**
  - **定义**：定义页面的宏观结构，如包含页眉、页脚、侧边栏的 `main-layout.ts`。
  - **特点**：使用 `<slot>` 来接收页面内容，实现页面结构的统一。

- **页面组件 (`src/pages/`)**
  - **定义**：应用的顶层组件，代表一个完整的视图。它负责组合布局组件和业务组件。
  - **特点**：通常与路由直接关联，是业务逻辑的主要协调者。

---

## 3. 状态管理

根据状态的作用域选择合适的方案。

- **局部状态 (Component State)**
  - **方案**：使用 Lit 内置的 `@state` 和 `@property` 装饰器。
  - **适用场景**：仅在单个组件内部使用的状态，如一个下拉菜单是否展开、输入框的当前值等。
  - **最佳实践**：这是首选方案，尽可能将状态保持在组件局部。

- **全局状态 (Global State)**
  - **方案**：**`@lit-labs/context`**。
  - **适用场景**：需要跨组件层级共享的状态，如用户登录信息、应用主题、国际化语言等。
  - **为什么推荐它**：
    1.  **官方支持**：与 Lit 的生命周期和响应式系统完美集成。
    2.  **轻量级**：无需引入庞大的第三方库。
    3.  **类型安全**：与 TypeScript 结合良好。
  - **示例 (`src/store/auth-context.ts`)**:

    ```typescript
    import { createContext } from '@lit-labs/context';

    export type User = { name: string; email: string } | null;
    export const authContext = createContext<User>(Symbol('auth'));
    ```

  - **备选方案**：对于超大型或状态逻辑极其复杂的应用，可以考虑引入 **Zustand** 或 **Redux**。

---

## 4. 构建与部署 (使用 Bun)

Bun 在此项目中扮演包管理器、脚本运行器和内置测试器的角色。项目构建依然依赖 Vite。

- **依赖管理**：
  - 安装依赖：`bun install`
  - 添加依赖：`bun add <package>`
  - 添加开发依赖：`bun add -d <package>`

- **`package.json` 脚本建议**：

  ```json
  "scripts": {
    "dev": "vite",
    "build": "bun test && tsc && vite build",
    "preview": "vite preview",
    "test": "bun test",
    "lint": "eslint . --ext .ts,.js",
    "format": "prettier --write ."
  },
  ```

- **开发 (`bun run dev`)**：
  - 使用 Vite 提供开发服务器和热模块替换 (HMR)。

- **测试 (`bun test`)**：
  - 使用 Bun 内置的、与 Jest 兼容的测试运行器。

- **构建 (`bun run build`)**：
  - 流程：先运行测试 (`bun test`) -> 然后进行类型检查 (`tsc`) -> 最后使用 Vite 打包 (`vite build`)。

- **部署**：
  - `vite build` 命令会生成一个 `dist` 目录。
  - 将 `dist` 目录下的所有静态文件部署到任何静态网站托管平台。

---

## 5. 代码规范

自动化工具是保证团队代码风格一致和质量的基石。

- **Linting (ESLint)**:
  - **安装**：`bun add -d eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-lit eslint-config-prettier`
  - **配置 (`.eslintrc.cjs`)**：配置 `typescript-eslint` 解析器和 `eslint-plugin-lit` 插件。

- **Formatting (Prettier)**:
  - **安装**：`bun add -d prettier`
  - **配置 (`.prettierrc`)**：定义代码格式化规则。
  - **集成**：使用 `eslint-config-prettier` 来关闭 ESLint 中与 Prettier 冲突的规则。

- **提交前自动化 (Husky + lint-staged)**:
  - **目标**：在 `git commit` 时自动格式化和检查代码。
  - **安装**：`bun add -d husky lint-staged`
  - **配置 (`package.json`)**:
    ```json
    "lint-staged": {
      "*.{ts,js}": "eslint --fix",
      "*.{ts,js,css,md,html,json}": "prettier --write"
    }
    ```
  - **设置 Husky**：运行 `bunx husky init` 并配置 `pre-commit` hook。
