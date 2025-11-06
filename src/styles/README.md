# SASS/SCSS 样式结构使用说明

## 📁 目录结构

本项目采用基于 7-1 模式的 SASS/SCSS 文件结构：

```
src/styles/
├── abstracts/          # 🔧 工具和辅助文件（变量、函数、mixins）
│   ├── _variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   ├── _placeholders.scss
│   └── _index.scss
├── base/               # 🏗️ 基础样式（重置、排版、全局）
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _base.scss
│   └── _index.scss
├── components/         # 🧩 可复用组件（按钮、卡片等）
│   ├── _button.scss
│   ├── _card.scss
│   └── _index.scss
├── layout/             # 📐 布局样式（页头、页脚等）
│   ├── _header.scss
│   ├── _footer.scss
│   └── _index.scss
├── pages/              # 📄 特定页面样式
│   ├── _home.scss
│   └── _index.scss
├── themes/             # 🎨 主题样式（亮色/暗色）
│   ├── _light-theme.scss
│   ├── _dark-theme.scss
│   └── _index.scss
├── vendors/            # 📦 第三方库样式
│   └── _index.scss
└── main.scss           # 🚀 主入口文件
```

## 🚀 使用方法

### 1. 编译 SCSS

确保你的构建工具（如 Vite）配置为编译 `main.scss` 文件：

```bash
# 如果使用 Vite，Vite 会自动处理 SCSS 文件
npm run dev
npm run build
```

### 2. 在组件中使用

#### Lit 组件中导入样式：

```typescript
// my-element.ts
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
// 导入编译后的 CSS
import mainStyles from './styles/main.scss';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = mainStyles;

  render() {
    return html`
      <div class="container">
        <h1 class="hero-title">欢迎使用我的应用</h1>
        <button class="btn btn--primary">开始</button>
        <div class="card">
          <div class="card__header">
            <h2 class="card__title">卡片标题</h2>
          </div>
          <div class="card__body">
            <p class="card__text">这是一个卡片内容。</p>
          </div>
        </div>
      </div>
    `;
  }
}
```

#### 普通 HTML 项目中使用：

```html
<!-- 在 HTML 文件中引用编译后的 CSS -->
<link rel="stylesheet" href="/dist/main.css" />
```

### 3. 添加新的组件

1. 在 `components/` 目录下创建新的组件文件，如 `_modal.scss`
2. 在 `_index.scss` 中添加 `@forward 'modal'`
3. 在 `main.scss` 中添加 `@use 'components/modal'`

### 4. 自定义主题

1. 在 `themes/` 目录下创建新的主题文件，如 `_custom-theme.scss`
2. 在 `_index.scss` 中添加 `@forward 'custom-theme'`
3. 在 `main.scss` 中添加 `@use 'themes/custom-theme'`
4. 在 HTML 中使用：`data-theme="custom"`

## 🎯 核心特性

- ✅ **模块化**: 使用现代 Sass 模块系统（`@use`/`@forward`）
- ✅ **可扩展**: 清晰的目录结构，易于添加新组件和功能
- ✅ **主题支持**: 内置亮色/暗色主题支持
- ✅ **响应式**: 内置断点和响应式工具类
- ✅ **一致性**: 统一的命名约定和代码风格

## 📝 最佳实践

1. **变量优先**: 所有可复用的值都应该在 `_variables.scss` 中定义
2. **组件隔离**: 每个组件应该是独立的，可以在任何地方使用
3. **命名规范**: 使用 BEM 或类似命名规范
4. **单一职责**: 每个文件只负责一类样式
5. **文档注释**: 为复杂的 mixins 和函数添加注释

## 🛠️ 可用工具

- **变量**: 直接在 SCSS 文件中使用，如 `vars.$primary-color`
- **Mixins**: 使用 `@include`，如 `@include button-base`
- **占位符**: 使用 `@extend`，如 `@extend %container`

更多详细信息请参考各个文件中的注释。
